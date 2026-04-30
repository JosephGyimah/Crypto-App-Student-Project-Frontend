function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseClass = 'inline-flex items-center justify-center rounded-md font-medium leading-none tracking-[0.005em] transition-colors'

  const sizeClass =
    size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm'

  const variantClass =
    variant === 'secondary'
      ? 'border border-slate-300 bg-white text-black hover:bg-slate-100'
      : 'bg-blue-600 text-white hover:bg-blue-700'

  return (
    <button type={type} className={`${baseClass} ${sizeClass} ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

export default Button
