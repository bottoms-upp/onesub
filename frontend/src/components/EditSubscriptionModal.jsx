import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function EditSubscriptionModal({ subscription, categories, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    price: "",
    billingCycle: "MONTHLY",
    renewalDate: "",
    status: "ACTIVE",
    categoryId: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (subscription) {
      setFormData({
        name: subscription.name || "",
        provider: subscription.provider || "",
        price: subscription.price || "",
        billingCycle: subscription.billingCycle || "MONTHLY",
        renewalDate: subscription.renewalDate || "",
        status: subscription.status || "ACTIVE",
        categoryId: subscription.category?.id || (categories.length > 0 ? categories[0].id : "")
      });
    }
  }, [subscription, categories]);

  if (!subscription) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Enter subscription name");
    if (!formData.price || Number(formData.price) <= 0) return toast.error("Enter a valid price");
    if (!formData.renewalDate) return toast.error("Select renewal date");
    if (!formData.categoryId) return toast.error("Select category");

    try {
      setSaving(true);
      await onSave(subscription.id, {
        ...formData,
        price: Number(formData.price),
        categoryId: Number(formData.categoryId)
      });
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update subscription");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Subscription</h3>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Subscription Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
              />
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
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
              <label>Renewal Date</label>
              <input
                type="date"
                name="renewalDate"
                value={formData.renewalDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Status</label>
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
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Update Subscription"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSubscriptionModal;
