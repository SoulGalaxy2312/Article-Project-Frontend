import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const FullArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState();
  const VITE_SERVER_ARTICLE_URI = import.meta.env.VITE_SERVER_ARTICLE_URI; // Read from .env file

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return; // Prevents fetching if id is undefined

      try {
        console.log("Fetching article with ID:", id);
        const endpoint = `${VITE_SERVER_ARTICLE_URI}` + `${id}`;
        console.log("Request URL:", endpoint);
        
        const response = await axios.get(endpoint);
        console.log("API Response:", response.data);
        
        setArticle(response.data.data); // Assuming the article is inside `data.data`
      } catch (error) {
        console.error("Error fetching article:", error.response ? error.response.data : error.message);
      }
    };

    fetchArticle();
  }, [id]); // Re-fetch when ID changes

  // Conditional rendering to avoid null errors
  if (!article) return <p>Loading...</p>;

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="w-75 p-4 border rounded shadow-sm bg-white">
        <h1 className="mb-3">{article.title}</h1>
        <p className="text-muted">
          By {article.authorName} | {new Date(article.createdAt).toLocaleDateString()}
        </p>
        <img src={article.mainImageUrl} alt={article.title} className="img-fluid rounded mb-3" />

        {/* Flex container for Topic, Tags, and Views */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0"><strong>Topic:</strong> {article.topic}</p>
          <div className="d-flex align-items-center">
            <strong>Tags:</strong>
            {article.tags.map(tag => (
              <span key={tag} className="badge bg-secondary me-2">{tag}</span>
            ))}
          </div>
          <p className="mb-0 text-muted"><strong>Views:</strong> {article.views}</p>
        </div>

        {/* Abstract Section */}
        <div className="p-3 bg-light border-start border-primary border-4 rounded mb-3">
          <p className="fst-italic mb-0">{article.abstractContent}</p>
        </div>

        {/* Article Content */}
        <div className="mt-3">
          <p>{article.content}</p>
        </div>
      </div>
    </div>
  );
};

export default FullArticlePage;
