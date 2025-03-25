import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./ArticlePreview.module.css"; // Import the CSS module
import { Badge } from 'react-bootstrap'

function ArticlePreview({ id, title, abstractionContent, mainImageUrl, createdBy, createdAt, isPremium }) {
  const navigate = useNavigate();

  return (
    <div 
      className={styles["article-preview"]} 
      onClick={() => navigate(`/article/${id}`)} 
      style={{ cursor: "pointer" }}
    >
      {/* Article Image */}
      <img src={mainImageUrl} alt={title} className="img-fluid rounded mb-2" />

      {/* Title and Premium Badge */}
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="fw-bold text-truncate">{title}</h5>
        {isPremium && <Badge bg="dark">Premium</Badge>}
      </div>

      {/* Article Abstract */}
      <p className="text-muted small">{abstractionContent}</p>

      {/* Footer: Author & Date */}
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