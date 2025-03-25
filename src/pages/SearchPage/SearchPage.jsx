import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import axios from "axios";
import API_ENDPOINTS from "../../constants/api";

const SearchPage = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  
  const params = new URLSearchParams(location.search);
  const tag = params.get("tag");
  const topicId = params.get("topicId");
  console.log("Topic ID: " + topicId);
  const keywords = params.get("keywords");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.API_BASE_URL}/search`, {
          params: { tag, topicId, keywords, pageNumber: page },
        });

        console.log(response);
        setArticles(response.data.data.articles || []);
        setHasMore(response.data.data.hasMore);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchArticles();
  }, [tag, topicId, keywords, page]);

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-9">
        {/* Render Articles */}
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticlePreview 
              key={article.id} 
              id={article.id}
              title={article.title} 
              abstractionContent={article.abstractionContent}
              mainImageUrl={article.mainImageUrl}
              createdBy={article.createdBy}
              createdAt={article.createdAt}
            />
          ))
        ) : (
          <p className="text-muted text-center">No articles found.</p>
        )}
  
        {/* Pagination Controls */}
        <div className="d-flex justify-content-between mt-4">
          <button 
            className="btn btn-dark fw-bold px-4 py-2 rounded-pill border-0 shadow-sm"
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            Older Articles
          </button>
          
          <button 
            className="btn btn-dark fw-bold px-4 py-2 rounded-pill border-0 shadow-sm"
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasMore}
          >
            Newer Articles
          </button>
        </div>
      </div>
    </div>
  );  
};

export default SearchPage;