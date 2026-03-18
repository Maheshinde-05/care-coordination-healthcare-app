import { clsx } from "clsx";

function getComplianceColor(pct) {
  if (pct >= 60) return "bg-care-500";
  if (pct >= 30) return "bg-gray-400";
  return "bg-gray-300";
}

export function ProgressBar({ value = 0, max = 100, className, color, showLabel = false, size = "md" }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const auto = color || getComplianceColor(pct);
  const heights = { xs: "h-1", sm: "h-1.5", md: "h-2", lg: "h-3" };

  return (
    <div className={clsx("w-full", className)}>
      <div className={clsx("w-full rounded-full bg-cara-muted overflow-hidden", heights[size])}>
        <div
          className={clsx("h-full rounded-full transition-all duration-700", auto)}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-cara-textMute">{value} / {max}</span>
          <span className="text-xs font-semibold text-cara-textSub">{Math.round(pct)}%</span>
        </div>
      )}
    </div>
  );
}

export function CircularProgress({ value = 0, max = 100, size = 64, strokeWidth = 6, label, sublabel }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const color = getComplianceColor(pct);
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  const colorMap = {
    "bg-care-500": "#2A9872",
    "bg-gray-400": "#9CA3AF",
    "bg-gray-300": "#D1D5DB",
  };
  const stroke = colorMap[color] || "#2A9872";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={stroke} strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.7s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        {label && <span className="text-sm font-bold text-cara-text leading-none">{label}</span>}
        {sublabel && <span className="text-[10px] text-cara-textMute leading-none mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
}
