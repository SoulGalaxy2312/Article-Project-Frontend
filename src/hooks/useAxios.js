import axios from "axios";
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_ENDPOINTS from "../constants/api";

const useAxios = () => {
    const { token } = useAuth();

    const axiosInstance = axios.create({
        baseURL: `${API_ENDPOINTS.API_BASE_URL}`,
    });

    // Attach token to every request
    axiosInstance.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => Promise.reject(error));

    // Handle unauthorized responses (401)
    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                toast.error("You are not authorized to access this resource.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxios;
