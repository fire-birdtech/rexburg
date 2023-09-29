import {
  type TextareaHTMLAttributes, forwardRef, useEffect, useImperativeHandle, useRef
} from 'react'
import classNames from '@/Utils/classNames'

const TextArea = forwardRef((
  { className = '', isFocused = false, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { isFocused?: boolean },
  ref
) => {
  const localRef = useRef<HTMLTextAreaElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }))

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus()
    }
  }, [])

  return (
    <textarea
      {...props}
      className={classNames(
        'prose-lg text-base h-52 w-full py-2 px-3 rounded-md resize-none border border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:border-slate-600 focus:ring-slate-600 overflow-y-auto',
        className
      )}
      ref={localRef}
    ></textarea>
  )
})

TextArea.displayName = 'TextArea'

export default TextArea
