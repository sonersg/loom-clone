'use client';

import FileInput from '@/components/FileInput';
import FormField from '@/components/FormField';
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from '@/constants';
import {
  getThumbnailUploadUrl,
  getVideoUploadUrl,
  saveVideoDetails,
} from '@/lib/actions/video';
import { useFileInput } from '@/lib/hooks/useFileInput';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const uploadFileToBunny = (
  file: File,
  uploadUrl: string,
  accessKey: string
): Promise<void> => {
  return fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
      AccessKey: accessKey,
    },
    body: file,
  }).then((response) => {
    if (!response.ok) throw new Error('Upload Failed');
  });
};

function page() {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [formData, setformData] = useState({
    title: '',
    description: '',
    visibility: 'public',
  });
  const [error, seterror] = useState('');
  const [videoDuration, setvideoDuration] = useState(0);
  const router = useRouter();

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  useEffect(() => {
    if (video.duration != null || 0) setvideoDuration(video.duration);
  }, [video.duration]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setformData((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setisSubmitting(true);
    try {
      if (!video.file || !thumbnail.file) {
        seterror('Please uplload video and thumbnail');
        return;
      }
      if (!formData.title || !formData.description) {
        seterror('Please fill in all the details');
        return;
      }

      // 0. Get upload URL
      const {
        videoId,
        uploadUrl: videoUploadUrl,
        accessKey: videoAccessKey,
      } = await getVideoUploadUrl();

      if (!videoUploadUrl || !videoAccessKey)
        throw new Error('Failed to get video upload credentials');

      // 1. Upload the video to Bunny
      await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

      // Upload the thumbnail to DB
      const {
        uploadUrl: thumbnailUploadUrl,
        cdnUrl: thumbnailCdnUrl,
        accessKey: thumbnailAccessKey,
      } = await getThumbnailUploadUrl(videoId);

      if (!thumbnailUploadUrl || !thumbnailCdnUrl || thumbnailAccessKey)
        throw new Error('Failed to get thumbnail upload credentials');

      // Attach thumbnail
      await uploadFileToBunny(
        thumbnail.file,
        thumbnailUploadUrl,
        thumbnailAccessKey
      );

      // Create a new DB entry for the video details (urls, data)
      await saveVideoDetails({
        videoId,
        thumbnailUrl: thumbnailCdnUrl,
        ...formData,
        duration: videoDuration,
      });

      router.push(`/video/${videoId}`);
    } catch (error) {
      console.log('Error submitting the form', error);
    } finally {
      setisSubmitting(false);
    }
  }

  return (
    <div className='wrapper-md upload-page'>
      <h1>Upload a Video</h1>
      {error && <p className='error-field'>{error}</p>}

      <form
        action=''
        className='rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7'
        onSubmit={handleSubmit}
      >
        <FormField
          id='title'
          label='Title'
          value={formData.title}
          onChange={handleInputChange}
          placeholder='Enter a clear and concise video title'
        />
        <FormField
          id='description'
          label='Description'
          value={formData.description}
          as='textarea'
          onChange={handleInputChange}
          placeholder='Describe what this video is about'
        />

        <FileInput
          id='video'
          label='Video'
          accept='Video/*'
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type='video'
        />

        <FileInput
          id='thumbnail'
          label='Thumbnail'
          accept='image/*'
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type='image'
        />

        <FormField
          id='visibility'
          label='Visibility'
          value={formData.visibility}
          as='select'
          onChange={handleInputChange}
          options={[
            { value: 'public', label: 'Public' },
            { value: 'private', label: 'Private' },
          ]}
        />

        <button type='submit' disabled={isSubmitting} className='submit-button'>
          {isSubmitting ? 'Uploading...' : 'Upload a video'}
        </button>
      </form>
    </div>
  );
}

export default page;
