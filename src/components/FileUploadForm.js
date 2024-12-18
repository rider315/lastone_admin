// frontend/src/components/FileUploadForm.js  
import React, { useState } from 'react';  
import axios from 'axios';  
import '../style.css';  

const FileUploadForm = () => {  
  const [file, setFile] = useState(null);  
  const [examName, setExamName] = useState('');  
  const [subjectName, setSubjectName] = useState('');  
  const [courseCode, setCourseCode] = useState('');  
  const [slotNumber, setSlotNumber] = useState('');  
  const [programmeBranch, setProgrammeBranch] = useState('');  
  const [year, setYear] = useState('');  

  const handleFileChange = (e) => setFile(e.target.files[0]);  

  const handleSubmit = async (e) => {  
    e.preventDefault();  

    if (!file || !examName || !subjectName || !courseCode || !slotNumber || !programmeBranch || !year) {  
      alert('All fields are required.');  
      return;  
    }  

    // Create FormData to send to backend  
    const formData = new FormData();  
    formData.append('file', file);  
    formData.append('examName', examName);  
    formData.append('subjectName', subjectName);  
    formData.append('courseCode', courseCode);  
    formData.append('slotNumber', slotNumber);  
    formData.append('programmeBranch', programmeBranch);  
    formData.append('year', year);  

    try {  
      const response = await axios.post('https://lastonebackend.onrender.com/api/upload-paper', formData, {  
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
        value={examName}  
        onChange={(e) => setExamName(e.target.value)}  
        placeholder="Exam Name"  
        required  
      />  
      <input  
        type="text"  
        value={subjectName}  
        onChange={(e) => setSubjectName(e.target.value)}  
        placeholder="Subject Name"  
        required  
      />  
      <input  
        type="text"  
        value={courseCode}  
        onChange={(e) => setCourseCode(e.target.value)}  
        placeholder="Course Code"  
        required  
      />  
      <input  
        type="text"  
        value={slotNumber}  
        onChange={(e) => setSlotNumber(e.target.value)}  
        placeholder="Slot Number"  
        required  
      />  
      <input  
        type="text"  
        value={programmeBranch}  
        onChange={(e) => setProgrammeBranch(e.target.value)}  
        placeholder="Programme and Branch"  
        required  
      />  
      <input  
        type="text"  
        value={year}  
        onChange={(e) => setYear(e.target.value)}  
        placeholder="Year"  
        required  
      />  
      <input type="file" onChange={handleFileChange} required />  
      <button type="submit">Upload Paper</button>  
    </form>  
  );  
};  

export default FileUploadForm;


