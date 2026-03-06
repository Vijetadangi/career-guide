// ✅ Backend base URL (Dynamic)
export const BASE_URL = process.env.REACT_APP_API_URL || "https://career-guide-backend-tdqq.onrender.com";

// ================= EXISTING CODE (UNCHANGED) =================

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};

// ================= NEW ADDITION =================

// ✅ Helper for authenticated requests
export const authHeader = () => {
  const token = getToken();
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};
