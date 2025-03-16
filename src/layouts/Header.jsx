import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky-top">
      <div className="container-fluid d-flex align-items-center justify-content-between py-3">
        
        {/* Left Section: Logo & Search Bar */}
        <div className="d-flex align-items-center gap-3">
          {/* Logo - Moved to the Left */}
          <Link to="/" className="text-dark text-decoration-none fw-bold fs-4">TechNews</Link>

          {/* Search Bar - Moved Closer to Logo */}
          <div className="position-relative">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search..."
              style={{ width: "180px" }} // Adjust width as needed
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            {showDropdown && (
              <div className="position-absolute w-100 bg-white shadow-sm p-2 mt-1 rounded border">
                <Link 
                  to="/explore-topics"
                  className="btn w-100 py-1"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "gray",
                    outline: "none",
                    boxShadow: "none",
                    cursor: "pointer",
                    letterSpacing: "1px",
                    transition: "color 0.3s ease, font-weight 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "black"; 
                    e.target.style.fontWeight = "bold";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "gray"; 
                    e.target.style.fontWeight = "300";
                  }}
                >
                  Explore Topics
                </Link>
              </div>
            )}


          </div>
        </div>

        {/* Right Section: Login Button */}
        <Link 
          to="/login" 
          className="btn px-3" 
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "25px",  // More rounded corners
            fontWeight: "300",     // Leaner text
            padding: "6px 16px",   // Slimmer button
            border: "none",
            transition: "background-color 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#333"} // Slight darken on hover
          onMouseLeave={(e) => e.target.style.backgroundColor = "black"}
        >
          Login
        </Link>

      </div>
    </header>
  );
}

export default Header;
