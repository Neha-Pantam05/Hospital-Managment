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
