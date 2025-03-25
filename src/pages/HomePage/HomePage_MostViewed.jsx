import { useState, useEffect } from "react";
import axios from "axios";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import API_ENDPOINTS from "../../constants/api";
import { Link } from "react-router-dom";

const HomePage_MostViewed = () => {
  const [topics, setTopics] = useState([]); // ✅ Initialize as an empty array
  const [visibleTopics, setVisibleTopics] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [mostViewedArticles, setMostViewedArticles] = useState([])

  useEffect(() => {
    const fetchMostViewedArticles = async() => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.API_BASE_URL}/homepage/mostViewedArticles`);
        console.log("Fetched topics:", response.data.data); // 🔍 Debugging

        if (Array.isArray(response.data.data)) { // ✅ Ensure response is an array
          setMostViewedArticles(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setMostViewedArticles([])
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchMostViewedArticles();
  }, []) 

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.API_BASE_URL}/topic/explore-topics`);
        console.log("Fetched topics:", response.data.data); // 🔍 Debugging

        if (Array.isArray(response.data.data)) { // ✅ Ensure response is an array
          setTopics(response.data.data);
          setVisibleTopics(response.data.data.slice(0, 7));
        } else {
          console.error("Unexpected response format:", response.data);
          setTopics([]); // Prevent errors
          setVisibleTopics([]);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const toggleTopics = () => {
    setExpanded(!expanded);
    setVisibleTopics(expanded ? topics.slice(0, 7) : topics);
  };

  return (
    <div className="col-md-3">
      <h4>Most Viewed Articles</h4>
      {mostViewedArticles.map((article) => (
        <ArticlePreview
          key={article.id} 
          id={article.id}
          title={article.title} 
          abstractionContent={article.abstractionContent}
          mainImageUrl={article.mainImageUrl}
          createdBy={article.createdBy}
          createdAt={article.createdAt}
          isPremium={article.isPremium} />
      ))}

      <h4 className="mt-4">Explore Topics</h4>
      <div className="d-flex flex-wrap gap-2 mt-2">
        {visibleTopics.length > 0 ? (
          visibleTopics.map((topic, index) => (
            <Link to={`/search?topicId=${topic.id}`}
              key={topic.id || index} // Use `id` if available, otherwise fallback to `index`
              className="btn btn-light text-dark rounded-pill px-3 py-2 border shadow-sm"
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              {topic.name} {/* ✅ Access the `name` property of the topic */}
            </Link>
          ))
        ) : (
          <p className="text-muted">No topics available.</p>
        )}
      </div>
      <p
        className="mt-2 text-gray cursor-pointer"
        style={{ cursor: "pointer", fontSize: "14px" }}
        onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
        onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
        onClick={toggleTopics}
      >
        {expanded ? "Show less topics" : "See more topics"}
      </p>
    </div>
  );
};

export default HomePage_MostViewed;
