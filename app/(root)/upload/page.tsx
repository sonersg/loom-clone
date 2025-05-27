'use client';

import FileInput from '@/components/FileInput';
import FormField from '@/components/FormField';
import React, { ChangeEvent, useState } from 'react';

function page() {
  const [formData, setformData] = useState({
    title: '',
    description: '',
    visibility: 'public',
  });
  const [error, seterror] = useState(null);

  function handleInputChange(e: ChangeEvent) {
    const { name, value } = e.target;
    setformData((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <div className='wrapper-md upload-page'>
      <h1>Upload a Video</h1>
      {error && <p className='error-field'>{error}</p>}

      <form
        action=''
        className='rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7'
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

        <FileInput />
        <FileInput />

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
      </form>
    </div>
  );
}

export default page;
