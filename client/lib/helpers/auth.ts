export const saveAuthData = (token: string, email: string, name: string) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userName", name);
};

export const clearAuthData = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export const getCurrentUser = () => {
  return {
    email: localStorage.getItem("userEmail"),
    name: localStorage.getItem("userName"),
    token: localStorage.getItem("authToken"),
  };
};

export const getHeaders = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // If no token, redirect to login
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }

  return {
    "Authorization": token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

export const handleAPIError = async (response: Response) => {
  if (response.status === 401) {
    // Token expired or invalid
    localStorage.clear();
    window.location.href = "/";
    throw new Error("Session expired. Please login again.");
  }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Request failed");
  }

  return response;
};
