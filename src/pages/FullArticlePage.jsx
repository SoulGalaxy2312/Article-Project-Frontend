import React from "react";
import { useParams } from "react-router-dom";

const FullArticlePage = () => {
  const { id } = useParams();

  // Dummy data (replace with actual API fetch)
  const article = {
    id,
    authorName: "John Doe",
    title: "Understanding React Hooks",
    topic: "ReactJS",
    mainImageUrl: "https://via.placeholder.com/800",
    tags: ["React", "Hooks", "JavaScript"],
    abstractContent: "A deep dive into React Hooks and how they work.",
    isPremium: false,
    views: 1200,
    createdAt: "2025-03-16T12:00:00Z",
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
        <div className="w-75 p-4 border rounded shadow-sm">
            <h1 className="mb-3">{article.title}</h1>
            <p className="text-muted">By {article.authorName} | {new Date(article.createdAt).toLocaleDateString()}</p>
            <img src={article.mainImageUrl} alt={article.title} className="img-fluid rounded mb-3" />
            
            {/* Flex container for Topic, Tags, and Views */}
            <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0"><strong>Topic:</strong> {article.topic}</p>
            <div className="d-flex align-items-center">
                <strong>Tags:</strong> 
                {article.tags.map(tag => (
                <span key={tag} className="badge bg-secondary me-2">{tag}</span>
                ))}
            </div>
            <p className="mb-0 text-muted"><strong>Views:</strong> {article.views}</p>
            </div>

            <p>{article.abstractContent}</p>
        </div>
    </div>

  );
};

export default FullArticlePage;
