import { useState, useEffect } from "react";
import ArticlePreview from '../../components/ArticlePreview/ArticlePreview'
import axios from "axios";

const HomePage_Latest = () => {
  const [articles, setArticles] = useState([]); // Store fetched articles
  const [page, setPage] = useState(0); // Track current page
  const [hasMore, setHasMore] = useState(true); // Check if there are more articles

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_HOMEPAGE_URI}` + 'latestArticles', {
          params: { pageNumber: page }, // Send as query params
        });

        setArticles(response.data.data.articles);
        setHasMore(response.data.data.hasMore); // Update pagination state
      
        console.log("Fetched articles:", response.data.data.articles);
        console.log("Has more articles?", response.data.data.hasMore);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [page]); // Refetch when page changes

  return (
    <div className="col-md-9 border-end">
      {/* Render Articles */}
      {articles.map((article) => (
        <ArticlePreview 
          key={article.id} 
          id={article.id}
          title={article.title} 
          abstractionContent={article.abstractionContent}
          mainImageUrl={article.mainImageUrl}
          createdBy={article.createdBy}
          createdAt={article.createdAt}
        />
      ))}

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mt-4">
        <button 
          className="btn btn-dark fw-bold px-4 py-2 rounded-pill border-0 shadow-sm"
          style={{ padding: 0 }} 
          onMouseOver={(e) => e.target.style.textDecoration = "underline"}
          onMouseOut={(e) => e.target.style.textDecoration = "none"}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Older Articles
        </button>
        
        <button 
          className="btn btn-dark fw-bold px-4 py-2 rounded-pill border-0 shadow-sm"
          style={{ padding: 0 }} 
          onMouseOver={(e) => e.target.style.textDecoration = "underline"}
          onMouseOut={(e) => e.target.style.textDecoration = "none"}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasMore}
        >
          Newer Articles
        </button>
      </div>
    </div>
  );
};

export default HomePage_Latest;