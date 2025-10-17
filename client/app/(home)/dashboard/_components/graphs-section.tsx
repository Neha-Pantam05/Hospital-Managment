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

const patientVisitsData = [
  { day: "Mon", visits: 45 },
  { day: "Tue", visits: 52 },
  { day: "Wed", visits: 48 },
  { day: "Thu", visits: 61 },
  { day: "Fri", visits: 55 },
  { day: "Sat", visits: 38 },
  { day: "Sun", visits: 30 },
];

const ageGroupData = [
  { group: "0-12", patients: 18 },
  { group: "13-19", patients: 22 },
  { group: "20-35", patients: 45 },
  { group: "36-50", patients: 34 },
  { group: "51-65", patients: 28 },
  { group: "65+", patients: 19 },
];

const genderData = [
  { name: "Male", value: 48, color: "#3b82f6" },
  { name: "Female", value: 45, color: "#ec4899" },
  { name: "Other", value: 7, color: "#8b5cf6" },
];

const COLORS = {
  line: "#14b8a6",
  bar: "#f97316",
  pie: ["#3b82f6", "#ec4899", "#8b5cf6"],
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-sm text-gray-600">
          {payload[0].name}:{" "}
          <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const GraphsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
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
            <LineChart data={patientVisitsData}>
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
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              />
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
            <BarChart data={ageGroupData}>
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
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              />
              <Bar
                dataKey="patients"
                fill={COLORS.bar}
                radius={[8, 8, 0, 0]}
                name="Patients"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

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
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${((percent as number) * 100).toFixed(0)}%`
                }
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
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
