"use client";
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type GraphsSectionProps = {
  visitsByDay: { day: string; visits: number }[];
  genderDistribution: { gender: string; count: number; percentage: number }[];
  ageDistribution: { ageGroup: string; count: number }[];
}

const COLORS = {
  line: "#14b8a6",
  bar: "#f97316",
  pie: ["#3b82f6", "#ec4899", "#8b5cf6", "#10b981", "#f59e0b"],
};


const GraphsSection = ({ ageDistribution, genderDistribution, visitsByDay }: GraphsSectionProps) => {
  
  // Transform age distribution data to match chart expectations
  const transformedAgeData = ageDistribution?.map(item => ({
    group: item.ageGroup,
    count: item.count
  })) || [];

  // Transform gender distribution data for Pie chart
  const transformedGenderData = genderDistribution?.map(item => ({
    name: item.gender,
    value: item.count,
    percentage: item.percentage
  })) || [];

  // Ensure visitsByDay has proper data
  const transformedVisitsData = visitsByDay?.map(item => ({
    day: item.day.substring(0, 3), // Shorten day names (e.g., "Monday" -> "Mon")
    visits: item.visits
  })) || [];

  console.log("Transformed Age Data:", transformedAgeData);
  console.log("Transformed Gender Data:", transformedGenderData);
  console.log("Transformed Visits Data:", transformedVisitsData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Patient Visits Chart */}
      <Card className="shadow-lg border-gray-200 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            Patient Visits
          </CardTitle>
          <CardDescription>
            Number of patient visits per day this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transformedVisitsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
                stroke="#6b7280"
                style={{ fontSize: "14px", fontWeight: "500" }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: "14px", fontWeight: "500" }}
              />
              <Tooltip  />
              <Legend />
              <Line
                type="monotone"
                dataKey="visits"
                stroke={COLORS.line}
                strokeWidth={3}
                dot={{ fill: COLORS.line, r: 5 }}
                activeDot={{ r: 7 }}
                name="Visits"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Age Distribution Chart */}
      <Card className="shadow-lg border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            Patients by Age Group
          </CardTitle>
          <CardDescription>
            Distribution of patients across age ranges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transformedAgeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="group"
                stroke="#6b7280"
                style={{ fontSize: "14px", fontWeight: "500" }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: "14px", fontWeight: "500" }}
              />
              <Tooltip  />
              <Legend />
              <Bar
                dataKey="count"
                fill={COLORS.bar}
                radius={[8, 8, 0, 0]}
                name="Patients"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gender Distribution Chart */}
      <Card className="shadow-lg border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            Gender Distribution
          </CardTitle>
          <CardDescription>Patient demographics by gender</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={transformedGenderData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percentage }) => `${name} ${percentage}%`}
              >
                {transformedGenderData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS.pie[index % COLORS.pie.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value} (${props.payload.percentage}%)`, 
                  name
                ]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: "14px", fontWeight: "500" }}
                formatter={(value, entry) => (
                  <span style={{ color: "#374151" }}>
                    {value} ({entry.payload?.value})
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphsSection;