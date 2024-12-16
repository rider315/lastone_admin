// frontend/src/components/FileUploadForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';
const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleCoverChange = (e) => setCoverImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !coverImage || !title || !type) {
      alert('All fields are required.');
      return;
    }

    // Create FormData to send to backend
    const formData = new FormData();
    formData.append('file', file);
    formData.append('coverImage', coverImage);
    formData.append('title', title);
    formData.append('type', type);

    try {
      // Send data to the backend
    //   const response = await axios.post('http://localhost:5000/api/upload-paper', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   });
    // frontend/src/components/FileUploadForm.js
    const response = await axios.post('http://localhost:5000/api/upload-paper', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
  
      console.log('Paper uploaded:', response.data);
      alert('Paper uploaded successfully!');
    } catch (error) {
      console.error('Error uploading paper:', error);
      alert('Failed to upload paper.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type"
        required
      />
      <input type="file" onChange={handleFileChange} required />
      <input type="file" onChange={handleCoverChange} required />
      <button type="submit">Upload Paper</button>
    </form>
  );
};

export default FileUploadForm;
