import { Icon } from '@/Components/Icon'
import { type ReactElement } from 'react'

interface MetaDataItemProps {
  icon: string
  value: string
}

const icons = {
  check: (props: any) => <Icon icon="check" {...props}/>,
  mapPin: (props: any) => <Icon icon="mapPin" {...props}/>,
  student: (props: any) => <Icon icon="student" {...props}/>,
  students: (props: any) => <Icon icon="students" {...props}/>
}

export default function MetaDataItem ({ icon, value }: MetaDataItemProps): ReactElement {
  const IconComponent = icons[icon]

  return (
    <div className="flex items-center text-base leading-5">
      <div className="mr-2 h-5 w-5 shrink-0 text-slate-600 dark:text-slate-400">
        <IconComponent className="h-5 w-5 flex-none"/>
      </div>
      {value}
    </div>
  )
}
