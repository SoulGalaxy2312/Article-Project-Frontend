import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API_ENDPOINTS from '../constants/api'
import useAxios from '../hooks/useAxios'
import { Link } from "react-router-dom";

const FullArticlePage = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // Track which comment is being replied to
  const [replyContent, setReplyContent] = useState(""); // Reply text
  const [loading, setLoading] = useState(false);

  const endpoint = `${API_ENDPOINTS.API_BASE_URL}/article/${id}`;

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      try {
        const response = await axiosInstance.get(endpoint);
        setArticle(response.data.data);
      } catch (error) {
        if (error.response?.status === 401) {
          setError("You have to log in first to access this premium article.");
        } else {
          console.error("Error fetching article:", error.response?.data || error.message);
        }
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`${endpoint}/comments`);
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error.response?.data || error.message);
      }
    };

    fetchArticle();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post(`${endpoint}/createComment`, {
        articleId: id,
        content: newComment
      });

      setComments([response.data.data, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
    setLoading(false);
  };

  const handleReplySubmit = async (commentId) => {
    if (!replyContent.trim()) return;
  
    setLoading(true);
    try {
      const response = await axiosInstance.post(`${endpoint}/createComment`, {
        articleId: id,   // Keep this for identifying the article
        content: replyContent,
        parentCommentId: commentId  // Send parentCommentId to indicate it's a reply
      });
  
      // Find the comment and append the new reply
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [response.data.data, ...comment.replies] }
            : comment
        )
      );
  
      setReplyingTo(null);
      setReplyContent("");
    } catch (error) {
      console.error("Error posting reply:", error);
    }
    setLoading(false);
  };

  // Format date
  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  // Render comments and replies
  const renderComments = (commentsList, level = 0) => {
    return commentsList.map((comment) => (
      <div key={comment.id} className={`border-start p-2 mb-2 ${level > 0 ? "ms-4" : ""}`} 
           style={{ borderLeft: level > 0 ? "2px solid #007bff" : "none" }}>
        
        <p className="mb-1">
          <strong>{comment.user?.username || "Anonymous"}</strong> 
          - <small className="text-muted">{formatDate(comment.createdAt)}</small>
        </p>
  
        <p className="mb-1">{comment.content}</p>

        {/* Reply Button */}
        <button 
          className="btn btn-link btn-sm p-0" 
          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
        >
          Reply
        </button>

        {/* Reply Form (Appears when clicking Reply) */}
        {replyingTo === comment.id && (
          <div className="mt-2 ms-3">
            <textarea 
              className="form-control" 
              rows="2"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
            ></textarea>
            <button 
              className="btn btn-primary btn-sm mt-2"
              disabled={loading || !replyContent.trim()}
              onClick={() => handleReplySubmit(comment.id)}
            >
              {loading ? "Replying..." : "Post Reply"}
            </button>
          </div>
        )}

        {/* Render Nested Replies */}
        {comment.replies?.length > 0 && renderComments(comment.replies, level + 1)}
      </div>
    ));
  };  

  if (error) return <p className="alert alert-danger">{error}</p>;
  if (!article) return <p>Loading...</p>;

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="w-75 p-4 border rounded shadow-sm bg-white">
        <h1 className="mb-3">{article.title}</h1>
        <p className="text-muted">
          By {article.authorName} | {new Date(article.createdAt).toLocaleDateString()}
        </p>
        <img src={article.mainImageUrl} alt={article.title} className="img-fluid rounded mb-3" />

          <p className="mb-0">
            <strong>Topic:</strong>  
            <Link to={`/search?topicId=${article.topic.id}`} className="ms-1 text-decoration-none">
              {article.topic.name}
            </Link>
          </p>
            <strong>Tags:</strong>
            {article.tags.map(tag => (
              <Link 
              key={tag}  
              className="badge bg-secondary me-2"
              to={`/search?tag=${encodeURIComponent(tag)}`}>
                {tag}
              </Link>
            ))}
          <p className="mb-0 text-muted"><strong>Views:</strong> {article.views}</p>

        {/* Abstract Section */}
        <div className="p-3 bg-light border-start border-primary border-4 rounded mb-3">
          <p className="fst-italic mb-0">{article.abstractContent}</p>
        </div>

        {/* Article Content */}
        <div className="mt-3">
          <p>{article.content}</p>
        </div>

        {/* Comment Section */}
        <div className="mt-4">
          <h4>Comments</h4>
          {comments.length > 0 ? renderComments(comments) : <p>No comments yet.</p>}

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mt-3">
            <textarea 
              className="form-control" 
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
            ></textarea>
            <button 
              type="submit" 
              className="btn btn-primary mt-2" 
              disabled={loading || !newComment.trim()}
            >
              {loading ? "Posting..." : "Post Comment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FullArticlePage;
