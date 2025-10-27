import React from "react";
import PatientDetails from "../_components/patient-details";
type PatientDetailsPageProps = {
  params: Promise<{ id: string }>;
};
const PatientDetailsPage = async ({ params }: PatientDetailsPageProps) => {
  const id = (await params).id;
  return (
    <main className="px-10 py-6">
      <PatientDetails id={id} />
    </main>
  );
};

export default PatientDetailsPage;
