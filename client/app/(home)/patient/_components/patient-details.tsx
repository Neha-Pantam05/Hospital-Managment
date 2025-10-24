"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { User, Phone, Calendar, Clock } from "lucide-react";
import { EditPatientDialog } from "./edit-patient-dialog";

import { AddMedicalRecordDialog } from "./add-medical-record-dialog";
import PatientBasicInfoCard from "./patient-basic-info-card";
import PatientMedicalRecordCard from "./patient-medical-record-card";

export type MedicalRecord = {
  id: number;
  date: string;
  diagnosis: string;
  medicineType:string;
  medicineName: string;
  note?: string;
};

export type Patient = {
  id: number;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  mobile: string;

  medicalRecords: MedicalRecord[];
};

const mockPatient: Patient = {
  id: 1,
  name: "Aditi Singh",
  age: 28,
  gender: "Female",
  mobile: "+91 98765 43210",

  medicalRecords: [
    {
      id: 1,
      date: "2025-10-15",
      diagnosis: "Common Cold",
      medicineType: "Tablet",
      medicineName: "Paracetamol 500mg",
      note: "Take twice daily after meals for 3 days",
    },
    {
      id: 2,
      date: "2025-09-20",
      diagnosis: "Seasonal Allergy",
      medicineType: "Syrup",
      medicineName: "Cetirizine 10ml",
      note: "Take 5ml before bedtime",
    },
    {
      id: 3,
      date: "2025-08-10",
      diagnosis: "Vitamin D Deficiency",
      medicineType: "Capsule",
      medicineName: "Vitamin D3 60000 IU",
      note: "Take once weekly for 8 weeks",
    },
  ],
};

const GenderBadge = ({ gender }: { gender: string }) => {
  const variants = {
    Male: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0",
    Female: "bg-gradient-to-r from-pink-500 to-rose-600 text-white border-0",
    Other: "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0",
  };
  return (
    <Badge
      className={`${
        variants[gender as keyof typeof variants]
      } font-medium shadow-sm`}
    >
      {gender}
    </Badge>
  );
};

const PatientDetails = () => {
  const [patient, setPatient] = useState(mockPatient);

  const handleSavePatient = (data: Patient) => {
    setPatient(data);
    console.log("Patient updated:", data);
  };

  const handleAddRecord = (record: Omit<MedicalRecord, "id">) => {
    const newRecord = { ...record, id: patient.medicalRecords.length + 1 };
    setPatient({
      ...patient,
      medicalRecords: [newRecord, ...patient.medicalRecords],
    });
    console.log("Record added:", newRecord);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Patient Details</h1>
          <div className="flex gap-3">
            <EditPatientDialog patient={patient} onSave={handleSavePatient} />
            <AddMedicalRecordDialog onAdd={handleAddRecord} />
          </div>
        </div>

        <Card className="shadow-lg border-gray-200 p-0">
          <CardHeader className="bg-gradient-to-r  from-blue-50 to-teal-50 border-b">
            <div className="flex items-center gap-4 mt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {patient.name.charAt(0)}
              </div>
              <div>
                <CardTitle className="text-2xl">{patient.name}</CardTitle>
                <CardDescription className="text-base mt-1">
                  Patient ID: #{patient.id}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PatientBasicInfoCard
                color="from-blue-50 to-cyan-50 p-4 rounded-xl  border-blue-100"
                icon={User}
                iconColor="from-blue-500 to-cyan-500"
                label="Age"
                value={`${patient.age} years`}
              />
              <PatientBasicInfoCard
                color="from-pink-50 to-rose-50  border-pink-100"
                icon={User}
                iconColor="from-pink-500 to-rose-500 "
                label="Gender"
                value={<GenderBadge gender={patient.gender} />}
              />

              <PatientBasicInfoCard
                color="from-teal-50 to-emerald-50  border-teal-100"
                icon={Phone}
                iconColor="from-teal-500 to-emerald-500  "
                label="Mobile"
                value={patient.mobile}
              />

              <PatientBasicInfoCard
                color="from-amber-50 to-orange-50  border-amber-100"
                icon={Calendar}
                iconColor="from-amber-500 to-orange-500   "
                label="Total Visits"
                value={patient.medicalRecords.length}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-gray-200 p-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 border-b">
            <div className="flex items-center gap-3 mt-6">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Visit History</CardTitle>
                <CardDescription>
                  Medical records and prescriptions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {patient.medicalRecords.map((record) => (
                <PatientMedicalRecordCard
                  date={record.date}
                  diagnosis={record.diagnosis}
                  medicineName={record.medicineName}
                  medicineType={record.medicineType}
                  note={record.note}
                  key={record.id}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDetails;
