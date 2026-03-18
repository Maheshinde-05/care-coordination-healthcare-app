import { clsx } from "clsx";

const VARIANTS = {
  default:  "bg-white border border-cara-border shadow-xs",
  elevated: "bg-white shadow-lg border border-cara-border/60",
  care:     "bg-care-50 border border-care-200",
};

export function Card({ variant = "default", className, children, ...props }) {
  return (
    <div
      className={clsx("rounded-2xl", VARIANTS[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div className={clsx("px-6 pt-5 pb-3", className)}>{children}</div>
  );
}

export function CardBody({ className, children }) {
  return (
    <div className={clsx("px-6 pb-5", className)}>{children}</div>
  );
}

export function CardFooter({ className, children }) {
  return (
    <div className={clsx("px-6 py-4 border-t border-cara-border", className)}>{children}</div>
  );
}
