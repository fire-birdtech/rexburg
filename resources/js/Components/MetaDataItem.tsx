import { type ReactElement } from 'react'

interface MetaDataItemProps {
  icon: ReactElement
  value: string
}

export default function MetaDataItem ({ icon, value }: MetaDataItemProps): ReactElement {
  return (
    <div className="flex items-center text-base leading-5">
      <div className="mr-2 h-5 w-5 shrink-0 text-slate-600 dark:text-slate-400">
        {icon}
      </div>
      {value}
    </div>
  )
}
