function Input({ label, id, className = '', ...props }) {
  return (
    <label htmlFor={id} className="block space-y-2">
      {label ? <span className="text-sm font-medium text-black">{label}</span> : null}
      <input
        id={id}
        className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${className}`.trim()}
        {...props}
      />
    </label>
  )
}

export default Input
