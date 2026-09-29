import API from "./api";

export const getSubscriptions = async (userId) => {
  const url = userId ? `/subscriptions?userId=${userId}` : "/subscriptions";
  const response = await API.get(url);
  return response.data;
};

export const addSubscription = async (data) => {
  const response = await API.post("/subscriptions", data);
  return response.data;
};

export const updateSubscription = async (id, data) => {
  const response = await API.put(`/subscriptions/${id}`, data);
  return response.data;
};

export const renewSubscription = async (id) => {
  const response = await API.put(`/subscriptions/${id}/renew`);
  return response.data;
};

export const cancelSubscription = async (id) => {
  const response = await API.put(`/subscriptions/${id}/cancel`);
  return response.data;
};

export const deleteSubscription = async (id) => {
  const response = await API.delete(`/subscriptions/${id}`);
  return response.data;
};
