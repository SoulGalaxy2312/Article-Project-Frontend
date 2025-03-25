import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import API_ENDPOINTS from "../../constants/api";

export default function CreateArticlePage() {
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]); // Store topics from server
    const [formData, setFormData] = useState({
        title: "",
        topic: "",
        mainImage: null,
        tags: "",
        abstractContent: "",
        content: "", // ✅ Added content field
        isPremium: false,
    });
    const [error, setError] = useState(null);
    
    const fetchTopics = async () => {
        try {
            const response = await axiosInstance.get(`${API_ENDPOINTS.API_BASE_URL}/topic/explore-topics`);
            setTopics(response.data.data); // Assume response.data is an array of topics
        } catch (err) {
            console.error("Error fetching topics:", err);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("topic", formData.topic);
        formDataToSend.append("mainImage", formData.mainImage);
        formDataToSend.append("abstractContent", formData.abstractContent);
        formDataToSend.append("content", formData.content); // ✅ Added content field
        formDataToSend.append("isPremium", formData.isPremium.toString());

        if (Array.isArray(formData.tags)) {
            formData.tags.forEach(tag => formDataToSend.append("tags", tag));
        } else if (typeof formData.tags === "string") {
            formData.tags.split(",").forEach(tag => formDataToSend.append("tags", tag.trim()));
        }

        try {
            await axiosInstance.post(`${API_ENDPOINTS.API_BASE_URL}/article/createArticle`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create New Article</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" required minLength={3} maxLength={100} value={formData.title} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Topic</label>
                    <select name="topic" className="form-select" required value={formData.topic} onChange={handleChange}>
                        <option value="">Select a topic</option>
                        {topics.map((topic) => (
                            <option key={topic.id} value={topic.name}>{topic.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Main Image</label>
                    <input type="file" name="mainImage" className="form-control" accept="image/*" required onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Tags (comma-separated)</label>
                    <input type="text" name="tags" className="form-control" value={formData.tags} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Abstract Content</label>
                    <textarea name="abstractContent" className="form-control" required value={formData.abstractContent} onChange={handleChange}></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea 
                        name="content" 
                        className="form-control" 
                        required 
                        value={formData.content} 
                        onChange={handleChange} 
                        rows="6"
                    ></textarea>
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" name="isPremium" className="form-check-input" checked={formData.isPremium} onChange={handleChange} />
                    <label className="form-check-label">Is Premium</label>
                </div>

                <button type="submit" className="btn btn-primary">Create Article</button>
            </form>
        </div>
    );
}
