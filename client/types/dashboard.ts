export type DashboardData = {
  stats: {
    totalPatients: number;
    totalAppointments: number;
    pendingAppointments: number;
    completedAppointments: number;
  };
  graphs: {
    visitsByDay: { day: string; visits: number }[];
    ageDistribution: { group: string; count: number }[];
    genderDistribution: { gender: string; count: number; percentage: number }[];
  };
  appointments: {
    id: number;
    patient: string;
    time: string;
    status: "Pending" | "Missed" | "Completed";
  }[];
};
