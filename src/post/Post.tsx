import { useLocation, useNavigate } from "react-router-dom";
import "./Post.scss";
import { useState } from "react";

// Modal Component
const Modal = ({ isVisible, onClose, onConfirm, title, message, additionalActions, className }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${className}`}>
        <h3>{title}</h3>
        <div className="modal-body">
          {typeof message === 'string' ? <p>{message}</p> : message}
        </div>
        <div className="modal-actions">
          {additionalActions && <div className="additional-actions">{additionalActions}</div>}
          <button onClick={onConfirm} className="confirm-btn">Confirm</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Post = () => {
  const location = useLocation();
  const { post } = location.state;
  const navigate = useNavigate();

  const [sensitive, setSensitive] = useState(post.sensitive);
  const [isArchived, setIsArchived] = useState(post.archived);
  const [isSensitivityModalVisible, setSensitivityModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isRemarksModalVisible, setRemarksModalVisible] = useState(false);
  const [isArchiveModalVisible, setArchiveModalVisible] = useState(false);

  const [remarks, setRemarks] = useState([
    "This is a great post! Well done.",
    "Interesting perspective, thanks for sharing.",
    "I disagree with some points, but good effort.",
    "Could you provide more details on this topic?",
    "Fantastic job! This is very informative."
  ]);

  const toggleSensitivity = () => {
    setSensitivityModalVisible(true);
  };

  const toggleArchive = () => {
    setArchiveModalVisible(true);
  };

  const handleSensitivityConfirm = () => {
    setSensitive(!sensitive);
    setSensitivityModalVisible(false);
  };

  const handleDeleteConfirm = () => {
    navigate('/posts');
    setDeleteModalVisible(false);
  };

  const handleArchiveConfirm = () => {
    setIsArchived(!isArchived);
    setArchiveModalVisible(false);
  };

  const handleRemarksClick = () => {
    setRemarksModalVisible(true);
  };

  return (
    <div className="post">
      <table className="post-summary">
        <tbody>
          <tr>
            <th><strong>Posted by</strong></th>
            <td><strong>{post.username}</strong></td>
          </tr>
        </tbody>
      </table>
      <img src={post.media || "/noavatar.png"} alt={post.title} className="post-image" />
      <div className="post-actions">
        <p onClick={handleRemarksClick}>
          <strong>Claps </strong>{post.claps}
        </p>
        <p onClick={handleRemarksClick}>
          <strong>Remarks </strong>{remarks.length}
        </p>
      </div>
      <div className="post-details">
        <table>
          <tbody>
            <tr>
              <td><strong>Title</strong></td>
              <td>{post.title}</td>
            </tr>
            <tr>
              <td><strong>Description</strong></td>
              <td>{post.description}</td>
            </tr>
            <tr>
              <td><strong>Category</strong></td>
              <td>{post.category}</td>
            </tr>
            <tr>
              <td><strong>Location</strong></td>
              <td>{post.location}</td>
            </tr>
            <tr>
              <td><strong>Saved</strong></td>
              <td>{post.saved ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td><strong>Shares</strong></td>
              <td>{post.shared ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td><strong>Created At</strong></td>
              <td>{post.createdAt}</td>
            </tr>
          </tbody>
        </table>
        <div className="post-actions">
          <strong>Terminate Content</strong>
          <button onClick={toggleSensitivity} className="toggle-btn">
            {sensitive ? "Sensitive" : "Non Sensitive"}
          </button>
          <strong>Manage Content</strong>
          <button className="toggle-btn" onClick={toggleArchive}>
            {isArchived ? "Unarchive" : "Archive"}
          </button>
          <strong>Delete Content</strong>
          <button className="delete-btn" onClick={() => setDeleteModalVisible(true)}>
            Delete
          </button>
        </div>
      </div>

      {/* Sensitivity Confirmation Modal */}
      <Modal
        isVisible={isSensitivityModalVisible}
        onClose={() => setSensitivityModalVisible(false)}
        onConfirm={handleSensitivityConfirm}
        title="Confirm Sensitivity Change"
        message={`Are you sure you want to mark this post as ${sensitive ? "Non Sensitive" : "Sensitive"}?`}
        className="sensitivity-modal"
      />

      {/* Delete Confirmation Modal */}
      <Modal
  isVisible={isDeleteModalVisible}
  onClose={() => setDeleteModalVisible(false)}
  onConfirm={handleDeleteConfirm}
  title="Confirm Deletion"
  message="Are you sure you want to delete this post?"
  // additionalActions={
  //   <button className="archive" onClick={toggleArchive}>
  //     {isArchived ? "Unarchive" : "Archive"}
  //   </button>
  // }
  className="delete-modal"
/>


      {/* Archive Confirmation Modal */}
      <Modal
        isVisible={isArchiveModalVisible}
        onClose={() => setArchiveModalVisible(false)}
        onConfirm={handleArchiveConfirm}
        title="Confirm Archive"
        message={`Are you sure you want to ${isArchived ? "unarchive" : "archive"} this post?`}
        className="archive-modal"
      />

      {/* Remarks Modal */}
      <Modal
        isVisible={isRemarksModalVisible}
        onClose={() => setRemarksModalVisible(false)}
        title="Remarks"
        message={
          remarks.length > 0 ? (
            <ul>
              {remarks.map((remark, index) => (
                <li key={index}>{remark}</li>
              ))}
            </ul>
          ) : (
            "No Remarks to show now"
          )
        }
        className="remarks-modal"
      />
    </div>
  );
};

export default Post;
