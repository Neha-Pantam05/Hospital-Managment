'use client'
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, User, Trash2, Check, AlertCircle, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Appointment = {
  id: number;
  patient: string;
  time: string;
  status: "Pending" | "Missed" | "Completed";
};

const initialAppointments: Appointment[] = [
  { id: 1, patient: "Aditi Singh", time: "10:30 AM", status: "Pending" },
  { id: 2, patient: "Rahul Sharma", time: "11:00 AM", status: "Pending" },
  { id: 3, patient: "Sneha Patil", time: "01:00 PM", status: "Completed" },
  { id: 4, patient: "Vikram Desai", time: "02:30 PM", status: "Pending" },
];

const TodaysAppointmentSection = () => {
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleStatusChange = (id: number, newStatus: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status: newStatus } : appt))
    );
  };

  const handleSave = (id: number) => {
    const appt = appointments.find((a) => a.id === id);
    console.log(`Saved status for ${appt?.patient}: ${appt?.status}`);
  };

  const handleDelete = (id: number) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === "Pending").length,
    completed: appointments.filter(a => a.status === "Completed").length,
  };

  return (
    <Card className="shadow-lg  py-0 border-gray-200 overflow-hidden">
      <CardHeader className="bg-gradient-to-r py-0 from-blue-50 to-teal-50 border-b">
        <div className="flex mt-10 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Today's Appointments</CardTitle>
              <CardDescription className="mt-1">
                {stats.total} total · {stats.pending} pending · {stats.completed} completed
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No appointments scheduled for today</p>
            <p className="text-sm text-gray-400 mt-1">Your schedule is clear!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((appt, index) => (
              <div
                key={appt.id}
                className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{appt.patient}</p>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{appt.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2">
                    <Select
                      value={appt.status}
                      onValueChange={(value) => handleStatusChange(appt.id, value as Appointment["status"])}
                    >
                      <SelectTrigger className="w-full sm:w-40 border-gray-300 focus:ring-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span>Pending</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Completed">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600" />
                            <span>Completed</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Missed">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span>Missed</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleSave(appt.id)}
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
                      >
                        <Check className="w-4 h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Save</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDelete(appt.id)}
                        className="flex-1 sm:flex-none text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

              
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysAppointmentSection;