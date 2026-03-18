import { clsx } from "clsx";

const VARIANTS = {
  primary:   "bg-care-500 hover:bg-care-600 text-white shadow-sm active:bg-care-700",
  secondary: "bg-white hover:bg-cara-muted text-cara-text border border-cara-border shadow-xs",
  care:      "bg-care-500 hover:bg-care-600 text-white shadow-sm active:bg-care-700",
  ghost:     "bg-transparent hover:bg-cara-muted text-cara-textSub",
  outline:   "bg-transparent border border-cara-border hover:bg-cara-muted text-cara-text",
};

const SIZES = {
  xs: "px-2.5 py-1 text-xs rounded-lg",
  sm: "px-3.5 py-1.5 text-sm rounded-lg",
  md: "px-4 py-2 text-sm rounded-[10px]",
  lg: "px-5 py-2.5 text-base rounded-xl",
};

export function Button({ variant = "primary", size = "md", children, className, icon: Icon, iconRight, ...props }) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-semibold cursor-pointer",
        "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-care-400",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon size={14} className="flex-shrink-0" />}
      {children}
      {iconRight && <iconRight size={14} className="flex-shrink-0" />}
    </button>
  );
}
