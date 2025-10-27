"use client";
import ActionButtons from "@/components/action-buttons";
import React, { Suspense, useEffect, useState } from "react";
import {
  AppointmentTableSkeleton,
  GraphSkeleton,
  StatsSkeleton,
} from "./skeletons";
import StatsSection from "./stats-section";
import GraphsSection from "./graphs-section";
import TodaysAppointmentSection from "./todays-appoinment-section";
import { DashboardData } from "@/types/dashboard";
import { dashboardAPI } from "@/lib/apis/dashboard/api";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const data = await dashboardAPI.getDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      // Return fallback data
      return {
        stats: {
          totalPatients: 0,
          totalAppointments: 0,
          pendingAppointments: 0,
          completedAppointments: 0,
        },
        charts: {
          patientVisits: [],
          ageGroups: [],
          genderDistribution: [],
        },
        appointments: [],
      };
    }
  };
  
  return (
    <main className="px-4 md:px-10 py-6 overflow-x-hidden flex flex-col gap-10">
      <ActionButtons />

      <section>
        <Suspense fallback={<StatsSkeleton />}>
          <StatsSection
            completedAppointment={
              dashboardData?.stats.completedAppointments || 0
            }
            pendingAppointment={dashboardData?.stats.pendingAppointments || 0}
            totalAppointment={dashboardData?.stats.totalAppointments || 0}
            totalPatient={dashboardData?.stats.totalPatients || 0}
          />
        </Suspense>
      </section>
      <hr />

      <section>
        <Suspense fallback={<GraphSkeleton />}>
          <GraphsSection
            ageDistribution={dashboardData?.graphs.ageDistribution || []}
            genderDistribution={dashboardData?.graphs.genderDistribution || []}
            visitsByDay={dashboardData?.graphs.visitsByDay || []}
          />
        </Suspense>
      </section>

      {/* <section>
        <Suspense fallback={<AppointmentTableSkeleton />}>
          <TodaysAppointmentSection />
        </Suspense>
      </section> */}
    </main>
  );
}
