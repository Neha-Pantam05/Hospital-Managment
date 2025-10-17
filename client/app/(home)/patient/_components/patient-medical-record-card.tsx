import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Pill } from "lucide-react";
import React from "react";

type PatientMedicalRecordCardProps = {
  diagnosis: string;
  date: string;
  medicineType: "Tablet" | "Syrup" | "Powder" | "Capsule" | "Injection";
  medicineName: string;
  note?: string;
};
const MedicineTypeBadge = ({ type }: { type: string }) => {
  const variants = {
    Tablet: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0",
    Syrup: "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0",
    Powder: "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0",
    Capsule:
      "bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0",
    Injection:
      "bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-0",
  };
  return (
    <Badge className={`${variants[type as keyof typeof variants]} shadow-sm`}>
      {type}
    </Badge>
  );
};

const PatientMedicalRecordCard = ({
  date,
  diagnosis,
  medicineName,
  medicineType,
  note,
}: PatientMedicalRecordCardProps) => {
  return (
    <div className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 transition-all bg-gradient-to-br from-white to-gray-50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-md">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-lg">{diagnosis}</p>
            <p className="text-sm text-gray-600 font-medium">
              {format(date, "PP")}
            </p>
          </div>
        </div>
        <MedicineTypeBadge type={medicineType} />
      </div>
      <div className="flex items-center gap-2 mb-3 bg-gradient-to-r from-teal-50 to-emerald-50 p-3 rounded-lg border border-teal-100">
        <Pill className="w-5 h-5 text-teal-600" />
        <p className="text-gray-800 font-semibold">{medicineName}</p>
      </div>
      {note && (
        <div className="mt-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-700 leading-relaxed">{note}</p>
        </div>
      )}
    </div>
  );
};

export default PatientMedicalRecordCard;
