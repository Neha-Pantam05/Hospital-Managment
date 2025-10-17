import { CalendarRange, CheckCircle, User } from 'lucide-react'
import React from 'react'
import StatsCard from './stats-card'



const StatsSection = () => {
  return (
    <div className='flex flex-wrap gap-10'>
    <StatsCard
     color='border-teal-400 from-teal-500 to-cyan-400'
     icon={User}
     title='Total Patients'
     value={100}
    />
    <StatsCard
         color='border-blue-400 from-blue-600 to-teal-400'

     icon={CalendarRange}
     title='Total Appointment'
     value={10}
    />
     <StatsCard
      color='border-orange-400 from-orange-600 to-red-400'
      icon={CalendarRange}
      title='Pending Appointment'
      value={5}
     />
    <StatsCard
     color='border-green-400 from-emerald-600 to-teal-400'
     icon={CheckCircle}
     title='Completed Appointment'
     value={5}
    />
    </div>
  )
}

export default StatsSection