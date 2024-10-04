import { useState } from "react";
import "./Feeds.scss";
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../data";
import Modal from "./Modal";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { PiBird } from "react-icons/pi";

const columns: GridColDef[] = [
  {
    field: "categories",
    headerName: "Category",
    width: 120,
  },
  {
    field: "subCategories",
    type: "string",
    headerName: "Sub Category",
    width: 150,
  },
  {
    field: "location",
    type: "string",
    headerName: "Location",
    width: 150,
  },
  {
    field: "platform",
    headerName: "Platform",
    type: "string",
    width: 120,
  },
  {
    field: "usernameOrName",
    headerName: "Username",
    type: "string",
    width: 120,
  },
  {
    field: "mediaUrl",
    headerName: "Media",
    width: 120,
    
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 150,
  },

];


const categoryOptions = [
  "🛠️ Any Thing", "🏆 Awards", "🕴🏻 Business", "💼 Careers", 
  "😄 Casual & Humour", "🌦️ Climate", "🦸🏻 Comics", "👨🏻‍💻 Coding", 
  "👨🏻‍🍳 Cooking", "💃🏻 Dance", "📊 Economics", "🎓 Education", 
  "🎭 Entertainment", "🎉 Events", "👗 Fashion", "🏦 Finance", 
  "🏋🏻 Fitness", "🍔 Food", "🔧 Gadgets", "🎮 Games", 
  "📍 Geo Location", "🧘🏻 Health & Well being", "⛑️ Helpers", 
  "ℹ️ Information", "🌿 Nature", "📰 News", "🪪 Networking", 
  "🎬 Movies", "🎵 Music", "📷 Photography", "🎙️ Podcasts", 
  "🏛️ Politics", "🛍️ Shopping", "🎤 Singing", "🌠 Space", 
  "🚀 Startups", "🔯 Spirituality", "⚽ Sports", "🤝🏻 Support", 
  "💻 Technology", "📈 Trending", "✈️ Travels", "🚗 Vehicles", 
  "✍🏻 Writings", "🔠 Other"
];

const Feeds = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const [formData, setFormData] = useState({
    description: "",
    platform: "",
    usernameOrName: "",
    location: "",
    categories: "",
    subCategories: "",
    mediaUrl: null,
  });

  const [showDropdown, setShowDropdown] = useState(false);

  const handleCategorySelect = (categories) => {
    setFormData((prev) => ({
      ...prev,
      categories,
    }));
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const form = new FormData();
      form.append("description", formData.description);
      form.append("platform", formData.platform);
      form.append("usernameOrName", formData.usernameOrName);
      form.append("location", formData.location);
      form.append("categories", formData.categories);
      form.append("subCategories", formData.subCategories);
      form.append("mediaUrl", formData.mediaUrl);

      const response = await axios.post("http://localhost:8080/api/admin/feed", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        // SweetAlert2 after successful post creation
        Swal.fire({
          title: "Success!",
          text: "Post created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      // Optionally, show an error alert if post creation fails
      Swal.fire({
        title: "Error!",
        text: "Failed to create the post. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const platforms = [
    { name: "DeVi", icon: <PiBird /> },
    { name: "Instagram", icon: <FaInstagram /> },
    { name: "Facebook", icon: <FaFacebookF /> },
    { name: "Youtube", icon: <FaYoutube /> },
    { name: "LinkedIn", icon: <FaLinkedinIn /> },
    { name: "X", icon: <FaTwitter /> },
  ];

  return (
    <div className="feeds">

    


<div className="info">
  <div className="header-content">
    <h1 className="feeds-title">Feeds</h1>
    <div className="button-group">
      <button className="create-post-button" onClick={() => setOpen(true)}>
        Create Post
      </button>
      {/* <button className="second-button">
        New Button
      </button> */}
    </div>
  </div>
</div>





      <DataTable slug="products" columns={columns} rows={products} />

      {open && (
        <Modal setOpen={setOpen}>
          <form onSubmit={handleSubmit} className="postForm">
            <h2>Create a New Post</h2>
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />

            <div className="platform-dropdown">
              <input
                type="text"
                placeholder="Select Platform"
                value={formData.platform}
                readOnly
                required
              />
              <div className="platform-icons">
                {platforms.map((platform, index) => (
                  <div
                    key={index}
                    className="platform-icon"
                    onClick={() =>
                      setFormData({ ...formData, platform: platform.name })
                    }
                  >
                    {platform.icon}
                  </div>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Username"
              value={formData.usernameOrName}
              onChange={(e) =>
                setFormData({ ...formData, usernameOrName: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />

            <div className="category-dropdown">
              <input
                type="text"
                placeholder="Select Category"
                value={formData.categories}
                readOnly
                onClick={() => setShowDropdown((prev) => !prev)}
                
              />
              {showDropdown && (
                <div className="dropdown-options">
                  {categoryOptions.map((categories, index) => (
                    <div
                      key={index}
                      className="dropdown-option"
                      onClick={() => handleCategorySelect(categories)}
                    >
                      {categories}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Sub Categories"
              value={formData.subCategories}
              onChange={(e) =>
                setFormData({ ...formData, subCategories: e.target.value })
              }
            />

            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  const selectedFile = e.target.files[0];
                  setFormData({ ...formData, mediaUrl: selectedFile });
                }
              }}
              required
            />
            {formData.mediaUrl && <p>Selected file: {formData.mediaUrl.name}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Create Post"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Feeds;