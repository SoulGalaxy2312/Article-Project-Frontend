import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaSearch, FaPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import API_ENDPOINTS from "../constants/api";

export default function Header() {
    const auth = useAuth();
    const axiosInstance = useAxios();
    const logoutEndpoint = API_ENDPOINTS.API_BASE_URL + "/logout";
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleLogout = () => {
        try {
            axiosInstance.post(logoutEndpoint);
            auth.logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?keywords=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="bg-white shadow-sm sticky-top">
            <div className="container-fluid d-flex align-items-center justify-content-between py-3">
                <Link to="/" className="text-dark text-decoration-none fw-bold fs-4">TechNews</Link>

                {/* Search Box */}
                <form onSubmit={handleSearch} className="position-relative">
                    <input
                        type="text"
                        className="form-control rounded-pill ps-4 pe-5"
                        style={{ width: "250px", height: "40px", border: "1px solid #ccc" }}
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button 
                        type="submit"
                        className="btn position-absolute end-0 top-50 translate-middle-y me-2"
                        style={{ background: "transparent", border: "none" }}
                    >
                        <FaSearch size={16} className="text-secondary" />
                    </button>
                </form>

                {auth.isAuthenticated ? (
                    <div className="d-flex align-items-center gap-3">
                        {/* Create Article Button */}
                        <Link to="/create-article" className="btn btn-dark d-flex align-items-center gap-2">
                            <FaPlus size={16} /> Create Article
                        </Link>

                        <Link to="/profile" className="text-dark"><FaUser size={20} /></Link>
                        <button onClick={handleLogout} className="btn btn-link text-dark">
                            <FaSignOutAlt size={20} />
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="btn px-3" style={{ backgroundColor: "black", color: "white", borderRadius: "25px" }}>
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}
