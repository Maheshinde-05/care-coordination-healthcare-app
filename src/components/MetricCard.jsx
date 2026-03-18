import { clsx } from "clsx";

const VARIANT_STYLES = {
  critical:  { card: "bg-white border-gray-200", label: "text-gray-500", value: "text-gray-900" },
  attention: { card: "bg-white border-gray-200", label: "text-gray-500", value: "text-gray-800" },
  stable:    { card: "bg-white border-gray-200", label: "text-gray-500", value: "text-care-700" },
  pending:   { card: "bg-white border-gray-200", label: "text-gray-500", value: "text-gray-700" },
  inactive:  { card: "bg-white border-gray-200", label: "text-gray-400", value: "text-gray-500" },
  default:   { card: "bg-white border-gray-200 shadow-xs", label: "text-gray-500", value: "text-gray-900" },
};

export function MetricCard({ label, value, icon: Icon, variant = "default", trend, onClick, className }) {
  const s = VARIANT_STYLES[variant] || VARIANT_STYLES.default;
  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-2xl border p-4 flex flex-col gap-1 transition-all duration-150",
        s.card,
        onClick && "cursor-pointer hover:shadow-md hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className={clsx("text-[10px] font-bold uppercase tracking-widest", s.label)}>{label}</span>
        {Icon && <Icon size={14} className={clsx(s.label, "opacity-70")} />}
      </div>
      <div className="flex items-end gap-2 mt-0.5">
        <span
          className={clsx("font-black leading-none", s.value)}
          style={{ fontSize: "clamp(1.75rem,3.5vw,2.25rem)", letterSpacing: "-0.04em" }}
        >
          {value}
        </span>
        {trend && (
          <span className={clsx("text-xs font-semibold pb-0.5", trend.up ? "text-care-600" : "text-gray-500")}>
            {trend.up ? "↑" : "↓"} {trend.label}
          </span>
        )}
      </div>
    </div>
  );
}
