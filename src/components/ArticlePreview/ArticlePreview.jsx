import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./ArticlePreview.module.css"; // Import the CSS module

function ArticlePreview({ id, title, abstractionContent, mainImageUrl, createdBy, createdAt }) {
  const navigate = useNavigate();

  return (
    <div 
      className={styles["article-preview"]} 
      onClick={() => navigate(`/article/${id}`)} style={{ cursor: "pointer" }}>
        <img src={mainImageUrl} alt={title} className="img-fluid rounded mb-2" />
        <h5 className="fw-bold text-truncate">{title}</h5>
        <p className="text-muted small">{abstractionContent}</p>
        <div className="d-flex justify-content-between text-muted small">
          <span>By {createdBy}</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
    </div>
  );
}

// PropTypes validation
ArticlePreview.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  abstractionContent: PropTypes.string.isRequired,
  mainImageUrl: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  createdBy: PropTypes.string.isRequired,
};

export default ArticlePreview;