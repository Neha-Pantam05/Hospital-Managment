import { Badge } from "@/components/ui/badge";
import { MedicalRecord } from "@/types/patient";
import { format } from "date-fns";
import { Calendar, Pill } from "lucide-react";
import React from "react";


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

const PatientMedicalRecordCard = ({ record }: { record: MedicalRecord }) => {
  return (
    <div className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 transition-all bg-gradient-to-br from-white to-gray-50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-md">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-lg">
              {record.diagnosis}
            </p>
            <p className="text-sm text-gray-600 font-medium">
              {format(record.visitedAt, "PP")}
            </p>
          </div>
        </div>
       
      </div>
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-lg border border-teal-100">
        <div className="flex items-center gap-2 mb-3">
          <Pill className="w-5 h-5 text-teal-600" />
          <p className="text-sm font-semibold text-teal-800 uppercase tracking-wide">
            Prescribed Medicines
          </p>
        </div>
        <div className="space-y-2">
          {record.medicines.map((medicine, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-teal-400 to-emerald-500 rounded-full"></div>
                <p className="text-gray-800 font-semibold">
                  {medicine.medicineName}
                </p>
              </div>
              <MedicineTypeBadge type={medicine.medicineType} />
            </div>
          ))}
        </div>
      </div>
      {record.note && (
        <div className="mt-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-700 leading-relaxed">{record.note}</p>
        </div>
      )}
    </div>
  );
};

export default PatientMedicalRecordCard;
