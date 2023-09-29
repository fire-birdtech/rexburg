import {
  forwardRef, useEffect, useImperativeHandle, useRef, type InputHTMLAttributes
} from 'react'

const TextInput = forwardRef((
  {
    type = 'text', className = '', isFocused = false, ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
  ref
) => {
  const localRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }))

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus()
    }
  }, [])

  return (
    <input
    {...props}
    type={type}
    className={`focus:borer-slate-200 rounded-md border-slate-300 bg-white text-slate-700 shadow-sm focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-slate-600 dark:focus:ring-slate-600 ${className}`}
    ref={localRef}
    />
  )
})

TextInput.displayName = 'TextInput'

export default TextInput
