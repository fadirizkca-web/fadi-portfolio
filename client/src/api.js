
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Get the authentication token saved after sign-in.
export const getToken = () => {
  return localStorage.getItem("token");
};

// Send requests to the backend API.
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Include the JWT when the user is signed in.
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Read the backend response.
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.error || data.message || "Something went wrong."
    );
  }

  return data;
};

export default apiRequest;
