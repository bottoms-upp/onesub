import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import {
  getDashboardSummary,
  getCategorySpending,
  getUpcomingRenewals,
  getRecentSubscriptions
} from "../services/dashboardService";
import { renewSubscription, cancelSubscription } from "../services/subscriptionService";

function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  const [renewals, setRenewals] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const [s, c, r, rc] = await Promise.all([
        getDashboardSummary(user.id),
        getCategorySpending(user.id),
        getUpcomingRenewals(user.id),
        getRecentSubscriptions(user.id)
      ]);
      setSummary(s);
      setCategories(c);
      setRenewals(r);
      setRecent(rc);
    } catch (e) {
      console.error(e);
      toast.error("Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const handleQuickRenew = async (id, name) => {
    try {
      await renewSubscription(id);
      toast.success(`Renewed ${name} for next billing cycle!`);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to renew subscription");
    }
  };

  const handleQuickCancel = async (id, name) => {
    if (!window.confirm(`Are you sure you want to cancel ${name}?`)) return;
    try {
      await cancelSubscription(id);
      toast.success(`Cancelled ${name}`);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel subscription");
    }
  };

  const maxCategorySpend = categories.reduce((max, curr) => Math.max(max, Number(curr.total || 0)), 1);

  if (loading) {
    return (
      <div className="page-container">
        <Navbar />
        <main className="content-body loading-screen">
          <div className="spinner"></div>
          <p>Loading your subscription analytics...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar />

      <main className="content-body">
        <header className="page-header">
          <div>
            <h1>Analytics Dashboard</h1>
            <p>Welcome back, <strong>{user?.name}</strong>! Here is your expense breakdown.</p>
          </div>
          <Link to="/add-subscription" className="btn-primary">
            + Add New Subscription
          </Link>
        </header>

        {/* 4 Stat Cards */}
        <section className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-icon monthly">₹</div>
            <div className="stat-info">
              <span className="stat-label">Monthly Spending</span>
              <h2 className="stat-value">₹{(summary?.totalMonthlySpend || 0).toLocaleString()}</h2>
              <span className="stat-sub">Active recurring cost</span>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon yearly">📈</div>
            <div className="stat-info">
              <span className="stat-label">Yearly Projection</span>
              <h2 className="stat-value">₹{(summary?.totalYearlySpend || 0).toLocaleString()}</h2>
              <span className="stat-sub">Annual total cost</span>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon active">✅</div>
            <div className="stat-info">
              <span className="stat-label">Active Subscriptions</span>
              <h2 className="stat-value">{summary?.activeSubscriptions || 0}</h2>
              <span className="stat-sub">{summary?.cancelledSubscriptions || 0} Cancelled</span>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon renewals">⚡</div>
            <div className="stat-info">
              <span className="stat-label">Most Expensive</span>
              <h2 className="stat-value small-text">{summary?.mostExpensiveSubscription || "None"}</h2>
              <span className="stat-sub">{summary?.upcomingRenewals || 0} Due soon</span>
            </div>
          </div>
        </section>

        <div className="dashboard-columns">
          {/* Category Spending Breakdown */}
          <section className="dashboard-card glass-card">
            <div className="card-header">
              <h3>Spending by Category</h3>
              <span className="card-tag">Monthly breakdown</span>
            </div>
            {categories.length > 0 ? (
              <div className="category-bars">
                {categories.map((cat, i) => {
                  const pct = Math.round((Number(cat.total) / maxCategorySpend) * 100);
                  return (
                    <div key={i} className="category-bar-item">
                      <div className="category-bar-label">
                        <span className="cat-name">{cat.category}</span>
                        <span className="cat-amount">₹{Number(cat.total).toLocaleString()}</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <p>No active spending categories yet.</p>
              </div>
            )}
          </section>

          {/* Upcoming Renewals */}
          <section className="dashboard-card glass-card">
            <div className="card-header">
              <h3>Upcoming Renewals</h3>
              <span className="card-tag alert-tag">{renewals.length} Due Soon</span>
            </div>

            {renewals.length > 0 ? (
              <div className="upcoming-list">
                {renewals.map((item, idx) => (
                  <div key={idx} className="upcoming-item">
                    <div className="upcoming-main">
                      <strong>{item.name}</strong>
                      <span className="provider-name">{item.provider || "Service"}</span>
                    </div>
                    <div className="upcoming-date">
                      <span className="date-badge">{item.renewalDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No upcoming renewals in the next 30 days 🎉</p>
              </div>
            )}
          </section>
        </div>

        {/* Recent Activity List */}
        <section className="dashboard-card glass-card margin-top">
          <div className="card-header">
            <h3>Recent Subscriptions</h3>
            <Link to="/subscriptions" className="link-text">View All Subscriptions &rarr;</Link>
          </div>

          {recent.length > 0 ? (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Provider</th>
                    <th>Price</th>
                    <th>Cycle</th>
                    <th>Renewal Date</th>
                    <th>Status</th>
                    <th>Quick Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((sub) => (
                    <tr key={sub.id}>
                      <td><strong>{sub.name}</strong></td>
                      <td>{sub.provider || "—"}</td>
                      <td className="price-cell">₹{sub.price}</td>
                      <td><span className="cycle-badge">{sub.billingCycle}</span></td>
                      <td>{sub.renewalDate}</td>
                      <td>
                        <span className={`status-pill ${sub.status?.toLowerCase()}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {sub.status === "ACTIVE" ? (
                            <>
                              <button
                                className="btn-action renew"
                                onClick={() => handleQuickRenew(sub.id, sub.name)}
                                title="Extend renewal date by 1 billing cycle"
                              >
                                Renew
                              </button>
                              <button
                                className="btn-action cancel"
                                onClick={() => handleQuickCancel(sub.id, sub.name)}
                                title="Cancel subscription"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn-action renew"
                              onClick={() => handleQuickRenew(sub.id, sub.name)}
                            >
                              Reactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>No recent subscriptions created.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
