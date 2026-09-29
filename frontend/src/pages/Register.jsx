import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Please enter your full name");
    if (!formData.email.trim()) return toast.error("Please enter your email");
    if (!formData.password || formData.password.length < 4) return toast.error("Password must be at least 4 characters");

    try {
      setLoading(true);
      const res = await register(formData);
      toast.success("Account created successfully!");
      loginUser(res);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      const msg = typeof error.response?.data === "string" 
        ? error.response.data 
        : error.response?.data?.message || "Registration failed. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
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
          <h2>Create Account</h2>
          <p className="auth-subtitle">Start managing your recurring expenses</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

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
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
