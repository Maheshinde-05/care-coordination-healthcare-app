import { clsx } from "clsx";

const STATUS_RING = {
  critical:  "ring-2 ring-gray-600",
  attention: "ring-2 ring-gray-400",
  stable:    "ring-2 ring-care-400",
  pending:   "ring-1 ring-gray-300",
  inactive:  "ring-1 ring-gray-200",
};

const STATUS_BG = {
  critical:  "bg-gray-800 text-white",
  attention: "bg-gray-500 text-white",
  stable:    "bg-care-500 text-white",
  pending:   "bg-gray-200 text-gray-600",
  inactive:  "bg-gray-100 text-gray-500",
};

const SIZES = {
  xs:  "w-7  h-7  text-[10px]",
  sm:  "w-9  h-9  text-xs",
  md:  "w-11 h-11 text-sm",
  lg:  "w-14 h-14 text-base",
  xl:  "w-20 h-20 text-xl",
};

function initials(name = "") {
  return name.split(" ").slice(0, 2).map(n => n[0]?.toUpperCase() || "").join("");
}

export function Avatar({ name, status, size = "md", src, className }) {
  return (
    <div className={clsx(
      "rounded-full flex items-center justify-center font-bold flex-shrink-0",
      SIZES[size],
      STATUS_BG[status] || "bg-cara-muted text-cara-textSub",
      status && STATUS_RING[status],
      className
    )}>
      {src
        ? <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
        : initials(name)
      }
    </div>
  );
}
