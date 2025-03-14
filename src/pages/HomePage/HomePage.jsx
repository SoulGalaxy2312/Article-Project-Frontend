import React from "react";
import HomePage_Latest from "./HomePage_Latest";
import HomePage_MostViewed from "./HomePage_MostViewed";

const HomePage = () => {
  return (
    <div className="container-fluid mt-4 px-5">
      <div className="row">
        {/* Latest Articles (70%) */}
        <HomePage_Latest />

        {/* Trending Topics (30%) */}
        <HomePage_MostViewed />
      </div>
    </div>
  );
};

export default HomePage;
