import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import API_ENDPOINTS from "../../constants/api";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await axios.post(API_ENDPOINTS.API_BASE_URL + "/login", { username, password });
            setMessage("Login successful!");
            login(response.data.data); // Call login from context
            navigate("/");
        } catch (error) {
            setMessage("Login failed. Please check your credentials.");
            console.log(error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card p-4 shadow-lg" style={{ width: "500px" }}>
                <h2 className="text-center mb-3">Login</h2>
                {message && <div className="alert alert-danger">{message}</div>}
                <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                </div>
                <button onClick={handleLogin} className="btn btn-dark w-100">Login</button>
                <div className="text-center mt-3">
                    <span>Don&#39;t have an account yet? </span>
                    <button className="btn btn-link p-0" onClick={() => navigate("/register")}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;