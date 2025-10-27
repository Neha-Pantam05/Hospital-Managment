import { getHeaders } from "@/lib/helpers/auth";
import { Patient } from "@/types/patient";

export const patientAPI = {
  getAll: async () => {
    const response = await fetch(`http://localhost:8284/api/patients`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch patients");
    return response.json();
  },
  getById: async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/patients/${id}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    // console.log(response.json)
    if (!response.ok) throw new Error("Failed to fetch patient");
    return response.json();
  },

  search: async (query: string) => {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/patients/search?name=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    if (!response.ok) throw new Error("Failed to search patients");
    return response.json();
  },

  create: async (data: Omit<Patient,"id">) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/patients`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error("Failed to create patient");
    return response.json();
  },
  update: async (id: number, data: Partial<Patient>) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/patients/${id}`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error("Failed to update patient");
    return response.json();
  },
  delete: async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/patients/${id}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );
   
    if (!response.ok) throw new Error("Failed to delete patient");
    return 
  },
};
