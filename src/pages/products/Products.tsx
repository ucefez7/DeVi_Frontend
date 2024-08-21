import { useState } from "react";
import "./products.scss";
import { posts } from "../../data";

const Products = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="products">
      <div className="info">
        <h1>Posts</h1>
      </div>
      <div className="product-grid">
        {posts.map((post) => (
          <div className="product-card" key={post.id}>
            <img src={post.media || "/noavatar.png"} alt={post.title} className="product-image" />
            <div className="product-content">
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
