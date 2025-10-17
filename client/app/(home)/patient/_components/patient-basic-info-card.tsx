import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import React from 'react'


type PatientBasicInfoCardProps = {
    color:string,
    label:string,
    value:string | number | React.ReactNode
    icon:LucideIcon
    iconColor:string
}
const PatientBasicInfoCard = ({color,label,value,icon:Icon,iconColor}:PatientBasicInfoCardProps) => {
    
  return (
    <div className={cn("flex items-center gap-3 bg-gradient-to-br  p-4 rounded-xl border ", color)}>
    <div className={cn("p-2 bg-gradient-to-br  rounded-lg shadow-md",iconColor)}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-600 font-medium">{label}</p>
      
      <p className="font-semibold text-gray-800 text-lg">{value}</p>
    </div>
  </div>
  )
}

export default PatientBasicInfoCard