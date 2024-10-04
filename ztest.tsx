import { useState } from "react";
import axios from "axios";
import "./Feeds.scss";


const Add = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [formData, setFormData] = useState({
    description: "",
    platform: "",
    usernameOrName: "",
    location: "",
    categories: "",
    subCategories: "",
  });

  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append("description", formData.description);
    postData.append("platform", formData.platform);
    postData.append("usernameOrName", formData.usernameOrName);
    postData.append("location", formData.location);
    postData.append("categories", formData.categories);
    postData.append("subCategories", formData.subCategories);

    if (mediaFiles) {
      for (let i = 0; i < mediaFiles.length; i++) {
        postData.append("mediaUrl", mediaFiles[i]);
      }
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/api/admin/feed", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Post created successfully!");
        setOpen(false); // Close modal on success
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addPostModal">
      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} required />

        <label>Platform</label>
        <select name="platform" value={formData.platform} onChange={handleInputChange} required>
          <option value="">Select a platform</option>
          <option value="DeVi">DeVi</option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="Youtube">Youtube</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="X">X</option>
        </select>

        <label>Username</label>
        <input type="text" name="usernameOrName" value={formData.usernameOrName} onChange={handleInputChange} required />

        <label>Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleInputChange} />

        <label>Categories</label>
        <input type="text" name="categories" value={formData.categories} onChange={handleInputChange} required />

        <label>Sub Categories</label>
        <input type="text" name="subCategories" value={formData.subCategories} onChange={handleInputChange} />

        <label>Upload Media</label>
        <input type="file" multiple name="mediaUrl" onChange={handleFileChange} accept="image/*,video/*" />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default Add;
