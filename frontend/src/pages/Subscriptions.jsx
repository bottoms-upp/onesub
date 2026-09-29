import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import EditSubscriptionModal from "../components/EditSubscriptionModal";
import { useAuth } from "../context/AuthContext";
import {
  getSubscriptions,
  deleteSubscription,
  renewSubscription,
  cancelSubscription,
  updateSubscription
} from "../services/subscriptionService";
import { getCategories } from "../services/categoryService";

function Subscriptions() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Modal State
  const [editingSub, setEditingSub] = useState(null);

  const fetchInitialData = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const [subs, cats] = await Promise.all([
        getSubscriptions(user.id),
        getCategories()
      ]);
      setSubscriptions(subs);
      setCategories(cats);
    } catch (e) {
      console.error(e);
      toast.error("Unable to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [user]);

  const handleRenew = async (id, name) => {
    try {
      await renewSubscription(id);
      toast.success(`Renewed ${name}!`);
      fetchInitialData();
    } catch (e) {
      console.error(e);
      toast.error("Failed to renew subscription");
    }
  };

  const handleCancel = async (id, name) => {
    if (!window.confirm(`Are you sure you want to cancel ${name}?`)) return;
    try {
      await cancelSubscription(id);
      toast.success(`Cancelled ${name}`);
      fetchInitialData();
    } catch (e) {
      console.error(e);
      toast.error("Failed to cancel subscription");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Permanently delete ${name}? This cannot be undone.`)) return;
    try {
      await deleteSubscription(id);
      setSubscriptions((prev) => prev.filter((x) => x.id !== id));
      toast.success("Subscription deleted");
    } catch (e) {
      console.error(e);
      toast.error("Unable to delete subscription");
    }
  };

  const handleSaveEdit = async (id, updatedData) => {
    await updateSubscription(id, { ...updatedData, userId: user.id });
    toast.success("Subscription updated successfully!");
    fetchInitialData();
  };

  // Filtered subscriptions list
  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.provider && sub.provider.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && sub.status === "ACTIVE") ||
      (statusFilter === "CANCELLED" && sub.status === "CANCELLED");

    const matchesCategory =
      categoryFilter === "ALL" || sub.category?.id === Number(categoryFilter);

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="page-container">
      <Navbar />

      <main className="content-body">
        <header className="page-header">
          <div>
            <h1>Subscription Management</h1>
            <p>View, update, renew, and organize all your active or cancelled services.</p>
          </div>
          <Link to="/add-subscription" className="btn-primary">
            + Add New Subscription
          </Link>
        </header>

        {/* Filter & Search Bar */}
        <div className="filter-card glass-card">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search subscription or provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <div className="status-tabs">
              <button
                className={`tab-btn ${statusFilter === "ALL" ? "active" : ""}`}
                onClick={() => setStatusFilter("ALL")}
              >
                All ({subscriptions.length})
              </button>
              <button
                className={`tab-btn ${statusFilter === "ACTIVE" ? "active" : ""}`}
                onClick={() => setStatusFilter("ACTIVE")}
              >
                Active ({subscriptions.filter((s) => s.status === "ACTIVE").length})
              </button>
              <button
                className={`tab-btn ${statusFilter === "CANCELLED" ? "active" : ""}`}
                onClick={() => setStatusFilter("CANCELLED")}
              >
                Cancelled ({subscriptions.filter((s) => s.status === "CANCELLED").length})
              </button>
            </div>

            <div className="category-select-wrapper">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="select-input"
              >
                <option value="ALL">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Subscription List Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading subscriptions...</p>
          </div>
        ) : filteredSubscriptions.length === 0 ? (
          <div className="empty-card glass-card">
            <div className="empty-icon">📂</div>
            <h3>No Subscriptions Found</h3>
            <p>No subscriptions match your search or selected filters.</p>
            <Link to="/add-subscription" className="btn-secondary">
              + Add Subscription Now
            </Link>
          </div>
        ) : (
          <div className="subscriptions-grid">
            {filteredSubscriptions.map((sub) => (
              <div key={sub.id} className={`sub-card glass-card ${sub.status?.toLowerCase()}`}>
                <div className="sub-card-header">
                  <div>
                    <h3 className="sub-title">{sub.name}</h3>
                    <span className="sub-provider">{sub.provider || "Service Provider"}</span>
                  </div>
                  <span className={`status-pill ${sub.status?.toLowerCase()}`}>
                    {sub.status}
                  </span>
                </div>

                <div className="sub-card-body">
                  <div className="price-tag">
                    <span className="currency">₹</span>
                    <span className="amount">{sub.price}</span>
                    <span className="cycle">/{sub.billingCycle?.toLowerCase()}</span>
                  </div>

                  <div className="sub-details">
                    <div className="detail-row">
                      <span className="label">Category:</span>
                      <span className="category-pill">{sub.category?.name || "General"}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Next Renewal:</span>
                      <span className="value font-mono">{sub.renewalDate}</span>
                    </div>
                  </div>
                </div>

                <div className="sub-card-footer">
                  <div className="action-group-left">
                    {sub.status === "ACTIVE" ? (
                      <>
                        <button
                          className="btn-card-action renew"
                          onClick={() => handleRenew(sub.id, sub.name)}
                          title="Extend renewal date (+1 cycle)"
                        >
                          🔄 Renew
                        </button>
                        <button
                          className="btn-card-action cancel"
                          onClick={() => handleCancel(sub.id, sub.name)}
                          title="Mark subscription cancelled"
                        >
                          ⏸️ Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn-card-action renew"
                        onClick={() => handleRenew(sub.id, sub.name)}
                      >
                        ▶️ Reactivate
                      </button>
                    )}
                  </div>

                  <div className="action-group-right">
                    <button
                      className="btn-icon edit"
                      onClick={() => setEditingSub(sub)}
                      title="Edit Subscription"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-icon delete"
                      onClick={() => handleDelete(sub.id, sub.name)}
                      title="Delete Subscription"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Edit Modal */}
      <EditSubscriptionModal
        subscription={editingSub}
        categories={categories}
        onClose={() => setEditingSub(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

export default Subscriptions;
