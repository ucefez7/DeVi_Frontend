import { useLocation } from "react-router-dom";
import "./Post.scss";

const Post = () => {
  const location = useLocation();
  const { post } = location.state;

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <img src={post.media || "/noavatar.png"} alt={post.title} className="post-image" />
      <div className="post-details">
        <p><strong>Username: </strong> {post.username}</p>
        <p><strong>Location: </strong> {post.location}</p>
        <p><strong>Category:</strong> {post.category}</p>
        <p><strong>Claps:</strong> {post.claps}</p>
        <p><strong>Remarks:</strong> {post.remarks}</p>
        <p><strong>Saved:</strong> {post.saved ? "Yes" : "No"}</p>
        <p><strong>Shared:</strong> {post.shared ? "Yes" : "No"}</p>
        <p><strong>Created At:</strong> {post.createdAt}</p>
        <p><strong>Sensitivity:</strong> {post.sensitive ? "Sensitive" : "Non Sensitive"}</p>
      </div>
      <p className="post-description"><strong>Description:</strong> {post.description}</p>
    </div>
  );
};

export default Post;
