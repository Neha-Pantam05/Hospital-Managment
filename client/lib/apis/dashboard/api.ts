import { getHeaders } from "@/lib/helpers/auth";

export const dashboardAPI = {
  getDashboard: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
      {
        method: "GET",
        headers: getHeaders()
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }
    return response.json();
  },
};
