

export const saveAuthData = (token: string, email: string, name: string) => {
  if (typeof window === "undefined") return; // Prevent SSR crash
  localStorage.setItem("authToken", token);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userName", name);
};

export const clearAuthData = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
};

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("authToken");
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  return {
    email: localStorage.getItem("userEmail"),
    name: localStorage.getItem("userName"),
    token: localStorage.getItem("authToken"),
  };
};

export const getHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") {
    // SSR-safe default headers
    return {
      Authorization: "",
      "Content-Type": "application/json",
    };
  }

  const token = localStorage.getItem("authToken") || "";

  if (!token && typeof window !== "undefined") {
    window.location.href = "/";
  }

  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};


export const handleAPIError = async (response: Response) => {
  if (response.status === 401 && typeof window !== "undefined") {
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
