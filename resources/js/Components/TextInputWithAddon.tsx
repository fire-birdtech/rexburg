import {
  forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef,
} from 'react';

const TextInputWithAddon = forwardRef((
  {
    type = 'text', className = '', isFocused = false, placeholder, addonText = '', ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean, addonText: string },
  ref,
) => {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, []);

  return (
    <div className={`mt-1 flex rounded-md ${className}`}>
      <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-700 bg-slate-900 px-3 text-slate-300">
        {addonText}
      </span>
      <input
        {...props}
        type={type}
        className="block w-full flex-1 rounded-none rounded-r-md border-slate-700 bg-slate-900 text-slate-300 shadow-md focus:border-slate-600 focus:ring-slate-600"
        ref={localRef}
        placeholder={placeholder}
      />
    </div>
  );
});

TextInputWithAddon.displayName = 'TextInputWithAddon';

export default TextInputWithAddon;
