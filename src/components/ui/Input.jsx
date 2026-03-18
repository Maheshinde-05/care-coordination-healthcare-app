import { clsx } from "clsx";

export function Input({ label, error, icon: Icon, className, ...props }) {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-xs font-semibold text-cara-textSub uppercase tracking-wide">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-cara-textMute">
            <Icon size={15} />
          </div>
        )}
        <input
          className={clsx(
            "w-full bg-cara-surface border border-cara-border rounded-[10px]",
            "px-3 py-2 text-sm text-cara-text placeholder:text-cara-textMute",
            "transition-all duration-150 outline-none",
            "focus:border-care-500 focus:shadow-focus-care",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            Icon && "pl-9",
            error && "border-gray-500 focus:border-gray-600",
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-gray-600">{error}</p>}
    </div>
  );
}

export function Select({ label, children, className, ...props }) {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-xs font-semibold text-cara-textSub uppercase tracking-wide">{label}</label>
      )}
      <select
        className="w-full bg-cara-surface border border-cara-border rounded-[10px] px-3 py-2 text-sm text-cara-text outline-none focus:border-care-500 focus:shadow-focus-care transition-all duration-150"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
