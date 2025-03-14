import React from "react";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview"; // Assuming ArticlePreview exists

const HomePage_MostViewed = () => {
  return (
    <div className="col-md-3">
      <h4>Trending Topics</h4>
      {/* Example static articles, replace with API call later */}
      <ArticlePreview title="Most Viewed 1" />
      <ArticlePreview title="Most Viewed 2" />
      <ArticlePreview title="Most Viewed 3" />
    </div>
  );
};

export default HomePage_MostViewed;