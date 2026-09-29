import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.email.trim()) return toast.error("Please enter your email");
    if (!formData.password) return toast.error("Please enter your password");

    try {
      setLoading(true);
      const res = await login(formData);
      toast.success(res.message || "Login successful!");
      loginUser(res);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      const msg = typeof error.response?.data === "string" 
        ? error.response.data 
        : error.response?.data?.message || "Invalid email or password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoUser = () => {
    setFormData({ email: "demo@onesub.com", password: "password123" });
    toast.success("Demo credentials loaded! Click Login to continue.");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="brand-header">
          <div className="brand-logo-large">1S</div>
          <h1>one<span>Sub</span></h1>
          <p>Track, Analyze & Optimize All Your Subscriptions in One Place</p>
        </div>

        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Log in to manage your active subscriptions</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <button className="btn-primary full-width" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="demo-box">
            <p>Evaluating for project review?</p>
            <button type="button" className="btn-demo" onClick={fillDemoUser}>
              ⚡ Use Demo Account (Alex Morgan)
            </button>
          </div>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create one now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
