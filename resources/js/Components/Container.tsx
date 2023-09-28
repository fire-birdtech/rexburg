import { type PropsWithChildren, type ReactElement } from 'react'

function Container ({ children, className }: PropsWithChildren<{ className?: string }>): ReactElement {
  return <div className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
}

export default Container
