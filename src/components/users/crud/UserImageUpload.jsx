
import React, { useState } from 'react';
import { useUploadUserImageMutation } from '../../../features/users/userApiSlice';
import { selectCurrentId } from "../../../features/auth/authSlice";
import { useSelector } from 'react-redux';


const UserImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadFile, { isLoading, isError }] = useUploadUserImageMutation();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const user_id = useSelector(selectCurrentId)

  console.log('user_id:', user_id)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('user_id', user_id);

      try {
        await uploadFile(formData);
        console.log('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
      {isError && <div>Error uploading file</div>}
    </form>
  );
};

export default UserImageUpload;
