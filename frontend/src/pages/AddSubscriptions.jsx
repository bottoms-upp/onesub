import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { addSubscription } from "../services/subscriptionService";
import { getCategories } from "../services/categoryService";

function AddSubscriptions() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    price: "",
    billingCycle: "MONTHLY",
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "ACTIVE",
    categoryId: ""
  });

  useEffect(() => {
    getCategories()
      .then((cats) => {
        setCategories(cats);
        if (cats.length > 0) {
          setFormData((prev) => ({ ...prev, categoryId: cats[0].id }));
        }
      })
      .catch((e) => console.error("Failed to load categories", e));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyPreset = (preset) => {
    // find category ID by name match
    const matchingCat = categories.find((c) =>
      c.name.toLowerCase().includes(preset.categoryHint.toLowerCase())
    );

    setFormData({
      name: preset.name,
      provider: preset.provider,
      price: preset.price,
      billingCycle: preset.billingCycle,
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "ACTIVE",
      categoryId: matchingCat ? matchingCat.id : (categories[0]?.id || "")
    });
    toast.success(`Loaded preset for ${preset.name}!`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Enter subscription name");
    if (!formData.price || Number(formData.price) <= 0) return toast.error("Enter a valid price");
    if (!formData.renewalDate) return toast.error("Select renewal date");
    if (!formData.categoryId) return toast.error("Select category");
    if (!user?.id) return toast.error("User session missing. Please log in.");

    try {
      setLoading(true);
      await addSubscription({
        ...formData,
        price: Number(formData.price),
        categoryId: Number(formData.categoryId),
        userId: user.id
      });
      toast.success("Subscription added successfully!");
      navigate("/subscriptions");
    } catch (e) {
      console.error(e);
      toast.error("Unable to add subscription");
    } finally {
      setLoading(false);
    }
  };

  const presets = [
    { name: "Netflix Premium", provider: "Netflix Inc.", price: 649, billingCycle: "MONTHLY", categoryHint: "Entertainment", icon: "🍿" },
    { name: "Spotify Premium", provider: "Spotify AB", price: 119, billingCycle: "MONTHLY", categoryHint: "Music", icon: "🎵" },
    { name: "ChatGPT Plus", provider: "OpenAI", price: 1999, billingCycle: "MONTHLY", categoryHint: "Software", icon: "🤖" },
    { name: "YouTube Premium", provider: "Google", price: 149, billingCycle: "MONTHLY", categoryHint: "Entertainment", icon: "📺" },
    { name: "Notion Plus", provider: "Notion Labs", price: 800, billingCycle: "MONTHLY", categoryHint: "Work", icon: "📝" },
    { name: "Amazon Prime", provider: "Amazon", price: 1499, billingCycle: "YEARLY", categoryHint: "Entertainment", icon: "📦" },
  ];

  return (
    <div className="page-container">
      <Navbar />

      <main className="content-body form-page-content">
        <header className="page-header">
          <div>
            <h1>Add New Subscription</h1>
            <p>Track a new recurring expense in your portfolio.</p>
          </div>
          <Link to="/subscriptions" className="btn-secondary">
            &larr; Back to List
          </Link>
        </header>

        {/* Preset Launcher Bar */}
        <section className="preset-card glass-card">
          <span className="preset-label">⚡ Quick Presets (Click to autofill):</span>
          <div className="preset-chips">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="chip-btn"
                onClick={() => handleApplyPreset(p)}
              >
                <span>{p.icon}</span> {p.name}
              </button>
            ))}
          </div>
        </section>

        {/* Subscription Form */}
        <div className="form-card glass-card">
          <form onSubmit={handleSubmit} className="custom-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Subscription Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Netflix, Gym Membership"
                  required
                />
              </div>

              <div className="form-group">
                <label>Provider / Service</label>
                <input
                  type="text"
                  name="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  placeholder="e.g. Netflix Inc., Cult.fit"
                />
              </div>

              <div className="form-group">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="649"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Billing Cycle</label>
                <select
                  name="billingCycle"
                  value={formData.billingCycle}
                  onChange={handleChange}
                >
                  <option value="MONTHLY">Monthly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
              </div>

              <div className="form-group">
                <label>Next Renewal Date *</label>
                <input
                  type="date"
                  name="renewalDate"
                  value={formData.renewalDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Initial Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <Link to="/subscriptions" className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Saving Subscription..." : "+ Save Subscription"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddSubscriptions;
