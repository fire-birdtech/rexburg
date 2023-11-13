import { type ReactElement } from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo'

export default function LegalLayout ({ content }: { content: string }): ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center py-6 sm:pt-0">
      <ApplicationLogo className="mt-6 h-12 w-auto"/>

      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose mx-auto mt-6 w-full overflow-hidden bg-white p-6 shadow-md dark:prose-invert dark:bg-slate-800 sm:max-w-5xl sm:rounded-2xl"
      />
    </div>
  )
}
