'use client';

import FileInput from '@/components/FileInput';
import FormField from '@/components/FormField';
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from '@/constants';
import { useFileInput } from '@/lib/hooks/useFileInput';
import React, { ChangeEvent, FormEvent, useState } from 'react';

function page() {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [formData, setformData] = useState({
    title: '',
    description: '',
    visibility: 'public',
  });
  const [error, seterror] = useState('');

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

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

      // Upload the video to Bunny
      // Upload the thumbnail to DB
      // Attach thumbnail
      // Create a new DB entry for the video details (urls, data)
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
