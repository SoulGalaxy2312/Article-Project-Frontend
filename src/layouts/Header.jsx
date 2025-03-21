import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="bg-white shadow-sm sticky-top">
            <div className="container-fluid d-flex align-items-center justify-content-between py-3">
                <Link to="/" className="text-dark text-decoration-none fw-bold fs-4">TechNews</Link>

                {isAuthenticated ? (
                    <div className="d-flex align-items-center gap-3">
                        <Link to="/profile" className="text-dark"><FaUser size={20} /></Link>
                        <button onClick={handleLogout} className="btn btn-link text-dark"><FaSignOutAlt size={20} /></button>
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

export default Header;
