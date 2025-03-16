import React, { useState } from "react";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview"; // Assuming ArticlePreview exists

const HomePage_MostViewed = () => {
  const allTopics = [
    "Coding", "DevOps", "Data Science", "Python", "Java", "Software Engineering", "Node.js",
    "AI", "Machine Learning", "Cybersecurity", "Cloud Computing", "Blockchain", "Web Development", "Mobile Apps"
  ];
  
  const [visibleTopics, setVisibleTopics] = useState(allTopics.slice(0, 7));
  const [expanded, setExpanded] = useState(false);

  const toggleTopics = () => {
    setExpanded(!expanded);
    setVisibleTopics(expanded ? allTopics.slice(0, 7) : allTopics);
  };

  return (
    <div className="col-md-3">
      <h4>Trending Topics</h4>
      {/* Example static articles, replace with API call later */}
      <ArticlePreview title="Most Viewed 1" />
      <ArticlePreview title="Most Viewed 2" />
      <ArticlePreview title="Most Viewed 3" />

      {/* Explore Topics Section */}
      <h4 className="mt-4">Explore Topics</h4>
      <div className="d-flex flex-wrap gap-2 mt-2">
        {visibleTopics.map((topic, index) => (
          <button
            key={index}
            className="btn btn-light text-dark rounded-pill px-3 py-2 border shadow-sm"
            style={{ fontSize: "14px", fontWeight: "500" }}
          >
            {topic}
          </button>
        ))}
      </div>
      <p
        className="mt-2 text-gray cursor-pointer"
        style={{ cursor: "pointer", fontSize: "14px" }}
        onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
        onMouseLeave={(e) => e.target.style.textDecoration = "none"}
        onClick={toggleTopics}
      >
        {expanded ? "Show less topics" : "See more topics"}
      </p>
    </div>
  );
};

export default HomePage_MostViewed;