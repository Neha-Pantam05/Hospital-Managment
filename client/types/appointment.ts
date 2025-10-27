

export type AppointmentTableType = {
    id:number
  date: string;
  time: string;
  patientName: string;
  status: string;
};


export type CreateAppointment = {
  patientName: string;
  mobile: string;
  date:Date | string
  time:Date | string
  status:string
}