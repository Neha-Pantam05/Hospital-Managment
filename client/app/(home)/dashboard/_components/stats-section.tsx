import { CalendarRange, CheckCircle, User } from 'lucide-react'
import React from 'react'
import StatsCard from './stats-card'



type StatsSectionProps = {
  totalPatient:number,
  totalAppointment:number,
  pendingAppointment:number,
  completedAppointment:number

}
const StatsSection = ({completedAppointment,pendingAppointment,totalAppointment,totalPatient}:StatsSectionProps) => {
  return (
    <div className='flex flex-wrap gap-10'>
    <StatsCard
     color='border-teal-400 from-teal-500 to-cyan-400'
     icon={User}
     title='Total Patients'
     value={totalPatient}
    />
    <StatsCard
         color='border-blue-400 from-blue-600 to-teal-400'

     icon={CalendarRange}
     title='Total Appointment'
     value={totalAppointment}
    />
     <StatsCard
      color='border-orange-400 from-orange-600 to-red-400'
      icon={CalendarRange}
      title='Pending Appointment'
      value={pendingAppointment}
     />
    <StatsCard
     color='border-green-400 from-emerald-600 to-teal-400'
     icon={CheckCircle}
     title='Completed Appointment'
     value={completedAppointment}
    />
    </div>
  )
}

export default StatsSection