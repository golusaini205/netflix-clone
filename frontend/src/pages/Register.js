import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";

// Backend base URL: env in production, localhost in development
const API_BASE =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password)
      return alert("Fill all fields");

    try {
      setLoading(true);
      await axios.post(`${API_BASE}/api/auth/register`, {
        username,
        email,
        password
      });

      alert("Account created successfully 🎉");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card className="p-4 bg-dark text-white" style={{ width: "400px" }}>
        <h2 className="mb-3 text-center">Create Account</h2>

        <Form onSubmit={handleRegister}>
          <Form.Control
            className="mb-3"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <Form.Control
            className="mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Control
            className="mb-3"
            type="password"
            placeholder="Create Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="danger"
            className="w-100"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </Form>

        <div className="mt-3 text-center text-secondary">
          Already have an account?{" "}
          <span
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </div>
      </Card>
    </Container>
  );
}

export default Register;
