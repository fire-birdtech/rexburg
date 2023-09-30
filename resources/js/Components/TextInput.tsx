import {
  forwardRef, useEffect, useImperativeHandle, useRef, type InputHTMLAttributes
} from 'react'
import classNames from '@/Utils/classNames'

export const baseInputStyles = 'border border-slate-300 bg-white text-slate-700 shadow-sm focus:ring-1 focus:outline-none focus:ring-sky-300 focus:border-sky-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-slate-600 dark:focus:ring-slate-600'

export const TextInput = forwardRef((
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
    className={classNames(
      baseInputStyles,
      'rounded-md',
      className
    )}
    ref={localRef}
    />
  )
})

TextInput.displayName = 'TextInput'

export const TextInputWithAddon = forwardRef((
  {
    type = 'text', className = '', isFocused = false, placeholder, addonText = '', ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean, addonText: string },
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
    <div className={`mt-1 flex rounded-md ${className}`}>
      <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-300 bg-white px-3 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        {addonText}
      </span>
      <input
        {...props}
        type={type}
        className={classNames(
          baseInputStyles,
          'block w-full flex-1 rounded-none rounded-r-md'
        )}
        ref={localRef}
        placeholder={placeholder}
      />
    </div>
  )
})

TextInputWithAddon.displayName = 'TextInputWithAddon'
