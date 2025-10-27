"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Save,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { appointmentsAPI } from "@/lib/apis/appointments/api";

interface AppointmentData {
  patientName: string;
  mobile: string;
  date: string;
  time: string;
  status: "Pending" | "Completed" | "Missed";
}

const AddAppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentData>({
    patientName: "",
    mobile: "",
    date: "",
    time: "",
    status: "Pending",
  });
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      patientName: formData.patientName,
      mobile: formData.mobile,
      date: formData.date,
      time: formData.time,
      status: formData.status,
    };

    try {
      await appointmentsAPI.create(dataToSubmit);
      toast.success("Appointment scheduled successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to schedule appointment");
    } finally {
      setFormData((prev) => ({
        ...prev,
        patientName: "",
        mobile: "",
        date: "",
        time: "",
      }));
    }
  };

  const getInputClass = (): string =>
    `w-full pl-10 pr-3 py-2 border rounded-lg transition-all focus:ring-2 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-100 shadow-sm`;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen flex items-start justify-center font-sans">
      <Card className="w-full max-w-lg shadow-2xl rounded-xl overflow-hidden transform transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-600 p-6">
          <CardTitle className="flex items-center gap-3 text-white text-3xl font-extrabold tracking-tight">
            <Plus className="w-7 h-7" />
            Schedule New Appointment
          </CardTitle>
          <CardDescription className="text-blue-100 mt-1 text-sm font-light">
            Enter patient and appointment details. Status defaults to Pending.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="patientName"
                className="text-gray-700 font-semibold mb-2 block text-sm"
              >
                Patient Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="patientName"
                  type="text"
                  placeholder="Enter patient full name"
                  value={formData.patientName}
                  onChange={handleChange}
                  className={getInputClass()}
                  required
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="mobile"
                className="text-gray-700 font-semibold mb-2 block text-sm"
              >
                Mobile Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter 10 digit number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={getInputClass()}
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="date"
                  className="text-gray-700 font-semibold mb-2 block text-sm"
                >
                  Appointment Date
                </Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={getInputClass()}
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="time"
                  className="text-gray-700 font-semibold mb-2 block text-sm"
                >
                  Appointment Time
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={getInputClass()}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 pt-2">
              Appointment Status:{" "}
              <span className="font-semibold text-yellow-600">
                {formData.status}
              </span>{" "}
              (Set automatically)
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-bold bg-teal-600 hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200/50 flex items-center gap-2 mt-8"
            >
              <Save className="w-5 h-5" />
              Schedule Appointment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddAppointmentForm;
