import { getHeaders } from "@/lib/helpers/auth";
import { CreateAppointment } from "@/types/appointment";
import { format } from "date-fns";

export const appointmentsAPI = {
  getAll: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    if (!response.ok) throw new Error("Failed to fetch appointments");
    return response.json();
  },

  create: async (data: CreateAppointment) => {
    const formattedData = {
      patientName: data.patientName,
      date: format(new Date(data.date), "yyyy-MM-dd"), 
      time:
        typeof data.time === "string" && /^\d{2}:\d{2}$/.test(data.time)
          ? data.time
          : format(new Date(data.time), "HH:mm"), 
      mobile: data.mobile,
      status: data.status || "Pending",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(formattedData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create appointment: ${errorText}`);
    }
    
    return response.json();
  },

  update: async (id: number, status: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: status ,
      }
    );
    if (!response.ok) throw new Error("Failed to update appointment");
    return response.json();
  }
};
