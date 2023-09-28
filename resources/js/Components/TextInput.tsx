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
    className={`rounded-md border-slate-700 bg-slate-900 text-slate-300 shadow-sm focus:border-slate-600 focus:ring-slate-600 ${className}`}
    ref={localRef}
    />
  )
})

TextInput.displayName = 'TextInut'

export default TextInput
