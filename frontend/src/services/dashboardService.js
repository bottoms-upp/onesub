import API from "./api";

export const getDashboardSummary = async (userId) => {
  const url = userId ? `/dashboard/summary?userId=${userId}` : "/dashboard/summary";
  const response = await API.get(url);
  return response.data;
};

export const getCategorySpending = async (userId) => {
  const url = userId ? `/dashboard/category-spending?userId=${userId}` : "/dashboard/category-spending";
  const response = await API.get(url);
  return response.data;
};

export const getUpcomingRenewals = async (userId) => {
  const url = userId ? `/dashboard/upcoming?userId=${userId}` : "/dashboard/upcoming";
  const response = await API.get(url);
  return response.data;
};

export const getRecentSubscriptions = async (userId) => {
  const url = userId ? `/dashboard/recent?userId=${userId}` : "/dashboard/recent";
  const response = await API.get(url);
  return response.data;
};
