import { getHeaders } from "@/lib/helpers/auth";
import { CreateMedicalRecord } from "@/types/patient";

export const medicalRecordAPI = {
  getPatientMedicalRecords: async (patientId: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/medical-records/patient/${patientId}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    console.log(response)
    if (!response.ok) throw new Error("Failed to fetch medical record");
    return response.json();
  },

  
create: async (data:CreateMedicalRecord) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/medical-records`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create medical record');
    return response.json();
  },
  
};
