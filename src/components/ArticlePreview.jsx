import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ArticlePreview = ({ id, title, abstractionContent, mainImageUrl, createdBy }) => {
  const navigate = useNavigate();

  const handleArticleClick = () => {
    navigate(`/article/${id}`);
  };

  const handleAuthorClick = (event) => {
    event.stopPropagation(); // Prevent triggering the article click
    navigate(`/author/${createdBy}`);
  };

  return (
    <div 
      className="d-flex align-items-center border p-3 mb-3 shadow-sm" 
      style={{ cursor: "pointer" }} 
      onClick={handleArticleClick} 
    >
      {/* Content Section (2/3 width) */}
      <div className="flex-grow-1" style={{ width: "66.66%" }}>
        <p 
          className="text-black-50 mb-1" 
          style={{ fontSize: "0.85rem", cursor: "pointer" }}
          onClick={handleAuthorClick}
          onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
          onMouseLeave={(e) => e.target.style.textDecoration = "none"}
        >
          {createdBy}
        </p>
        <h5 className="fw-bold mb-1">{title}</h5>
        <p 
          className="text-black-50 mb-0" 
          style={{ fontSize: "0.95rem", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
        >
          {abstractionContent}
        </p>
      </div>

      {/* Spacer (1/12 width) */}
      <div style={{ width: "8.33%" }}></div>

      {/* Image Section (1/4 width) */}
      <div style={{ width: "25%" }}>
        <img 
          src={mainImageUrl} 
          alt="Article" 
          className="img-fluid rounded"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

ArticlePreview.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  abstractionContent: PropTypes.string.isRequired,
  mainImageUrl: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
};

export default ArticlePreview;
