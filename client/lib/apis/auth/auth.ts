import { User } from "@/types/user";

export const authAPI = {
  register: async (data: User) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.log(response)
      throw new Error(error || "Registration failed");
      
    }

    return response.json();
  },

  login: async (data: Omit<User, "name">) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const error = await response.text();
      console.log(response)
      throw new Error(error || "Login failed");
    }
    return response.json();
  },

  logout: async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },

  getCurrentUserInfo: () => {
    return {
      email: localStorage.getItem("userEmail"),
      name: localStorage.getItem("userName"),
      token: localStorage.getItem("authToken"),
    };
  },
};
