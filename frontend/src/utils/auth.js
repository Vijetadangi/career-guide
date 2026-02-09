// ✅ Backend base URL (PRODUCTION)
export const BASE_URL = "https://career-guide-backend-tdg.onrender.com";

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
