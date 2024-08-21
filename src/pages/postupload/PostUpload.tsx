// src/PostUpload.js
import { useState } from 'react';
import './PostUpload.css';
import axios from 'axios';

const PostUpload = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    formData.append('userId', userId);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post uploaded successfully:', response.data);
      setContent('');
      setImage(null);
      setUserId('');
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

  return (
    <div>
      <h1>Upload Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={handleUserIdChange}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Upload Post</button>
      </form>
    </div>
  );
};

export default PostUpload;
