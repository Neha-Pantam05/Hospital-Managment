export type PatientTable = {
  id: number;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  mob: string;
  lastVisited: string;
  createdAt: string;
};

export type MedicalRecord = {
  patientId: number;
  m_id: number;
  visitedAt: string;
  diagnosis: string;
  medicines: { medicineName: string; medicineType: string }[];
  note?: string;
};

export type Patient = {
  id: number;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  mob: string;
};

export type CreateMedicalRecord = {
  patientId: number;

  visitDate: string;
  diagnosis: string;
  medicines: { medicineName: string; medicineType: string }[];
  note?: string;
};
