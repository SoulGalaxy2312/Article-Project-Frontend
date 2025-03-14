import React from "react";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview"; // Assuming ArticlePreview exists

const HomePage_Latest = () => {
  return (
    <div className="col-md-9 border-end">
      {/* Example static articles, replace with API call later */}
      <ArticlePreview title="Latest Article 1" />
      <ArticlePreview title="Latest Article 2" />
      <ArticlePreview title="Latest Article 3" />
    </div>
  );
};

export default HomePage_Latest;
