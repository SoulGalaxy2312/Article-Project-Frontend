import { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Badge, Image, Form } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import API_ENDPOINTS from "../../constants/api";

const ProfilePage = () => {
  const axiosInstance = useAxios();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null); // Start as null
  const [isAdmin, setIsAdmin] = useState(false); // Track if user is an admin

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userResponse = await axiosInstance.get(`${API_ENDPOINTS.API_BASE_URL}/user/profile`);
        const userData = userResponse.data.data;
  
        setUser(userData);
        setIsAdmin(userData.role === "ROLE_ADMIN");
  
        // Set selectedStatus based on role
        setSelectedStatus(userData.role === "ROLE_ADMIN" ? "PENDING" : "PUBLISHED");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchProfileData();
  }, []);
  
  useEffect(() => {
    // Fetch articles only when selectedStatus is properly set
    if (selectedStatus) {
      const fetchArticles = async () => {
        try {
          const articlesResponse = await axiosInstance.get(`${API_ENDPOINTS.API_BASE_URL}/user/articles`, {
            params: { articleStatus: selectedStatus },
          });
          setArticles(articlesResponse.data.data);
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      };
  
      fetchArticles();
    }
  }, [selectedStatus]); // Only trigger when selectedStatus updates

  // Function to render status badge
  const renderStatusBadge = (status) => {
    let variant;
    switch (status) {
      case "PUBLISHED":
        variant = "success";
        break;
      case "PENDING":
        variant = "warning";
        break;
      case "REJECTED":
        variant = "danger";
        break;
      default:
        variant = "secondary";
    }
    return <Badge bg={variant}>{status}</Badge>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleStatusChange = async (articleId, newStatus) => {
    console.log("Article ID: " + articleId);
    console.log("New status: " + newStatus);

    const endpoint = `${API_ENDPOINTS.API_BASE_URL}/article/${articleId}/status?status=${newStatus}`
    console.log("Endpoint: " + endpoint);
    try {

      await axiosInstance.put(endpoint, { status: newStatus });
  
      // Update articles state by removing the updated one
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== articleId) // Remove from list
      );
    } catch (error) {
      console.error(`Error updating article status: ${error}`);
    }
  };  

  return (
    <Container fluid className="p-4">
      <Row>
        {/* User Info Section */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Account Information</Card.Title>
              {user ? (
                <>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Birthday:</strong> {formatDate(user.birthDate)}</p>
                  <p><strong>Role:</strong> <Badge bg={isAdmin ? "danger" : "primary"}>{user.role}</Badge></p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Articles Section */}
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title>{isAdmin ? "Pending Articles for Review" : "Your Articles"}</Card.Title>

                {/* Status Filter Dropdown (Disabled for Admins) */}
                {!isAdmin && (
                  <Form.Select 
                    value={selectedStatus} 
                    onChange={(e) => setSelectedStatus(e.target.value)} 
                    className="w-auto"
                  >
                    <option value="PUBLISHED">Published</option>
                    <option value="PENDING">Pending</option>
                    <option value="REJECTED">Rejected</option>
                  </Form.Select>
                )}
              </div>

              <ListGroup variant="flush">
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <ListGroup.Item key={article.id} className="d-flex align-items-center justify-content-between">
                      {/* Left: Article Info */}
                      <div className="d-flex align-items-center">
                        <Image src={article.mainImageUrl} alt="Article Image" thumbnail width="80" className="me-3" />

                        <div className="flex-grow-1">
                          <h5 className="mb-1">
                            {article.title} {renderStatusBadge(article.status)}
                          </h5>
                          <small className="text-muted">{article.topic} - {article.tags.join(", ")}</small>
                          <p className="mb-1">{article.abstractContent}</p>
                          {article.isPremium && <Badge bg="dark">Premium</Badge>}
                        </div>
                      </div>

                      {/* Right: Admin Action Buttons */}
                      {isAdmin && selectedStatus === "PENDING" && (
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-success btn-sm" 
                            onClick={() => handleStatusChange(article.id, "PUBLISHED")}
                          >
                            ✅ Publish
                          </button>
                          <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleStatusChange(article.id, "REJECTED")}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      )}
                    </ListGroup.Item>

                  ))
                ) : (
                  <ListGroup.Item className="text-center">No articles found</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
