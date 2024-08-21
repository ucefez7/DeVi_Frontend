import { useNavigate } from "react-router-dom";
import "./products.scss";
import { posts } from "../../data";

const Products = () => {
  const navigate = useNavigate();

  const handleCardClick = (post) => {
    // navigate(`/post/${post.id}`, { state: { post } });
    navigate(`/posts/${post.id}`, { state: { post } });
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Feeds</h1>
      </div>
      <div className="product-grid">
        {posts.map((post) => (
          <div className="product-card" key={post.id} onClick={() => handleCardClick(post)}>
            <div className="product-content">
              <h2 className="product-username">{post.username}</h2>
              <img src={post.media || "/noavatar.png"} alt={post.title} className="product-image" />
              <h2 className="product-title">{post.title}</h2>
              <p className="product-tags">{post.category}</p>
              <div className="product-meta">
                <span className="product-likes">{post.claps} Claps</span>
                <span className="product-comments">{post.remarks} Remarks</span>
              </div>
              <span className="product-date">{post.createdAt}</span>
              <span className={`product-stock ${post.sensitive ? "out-of-stock" : "in-stock"}`}>
                {post.sensitive ? "Sensitive" : "Non Sensitive"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
