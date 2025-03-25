import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../../constants/api";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        birthDate: ""
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const endpoint = API_ENDPOINTS.API_BASE_URL + "/register"

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(endpoint, formData);
            setSuccess(response.data.message);
            setTimeout(() => navigate("/login"), 2000); // Redirect after 2 sec
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" name="username" className="form-control" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Birth Date</label>
                    <input type="date" name="birthDate" className="form-control" required onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
