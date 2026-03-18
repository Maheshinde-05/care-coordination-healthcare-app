import { clsx } from "clsx";

// White backgrounds, semantic meaning conveyed through text weight + teal for positive states
const STATUS_STYLES = {
  critical:  { dot: "bg-gray-800",   pill: "bg-white text-gray-900  border border-gray-200", label: "Critical",  weight: "font-bold"    },
  attention: { dot: "bg-gray-500",   pill: "bg-white text-gray-700  border border-gray-200", label: "Attention", weight: "font-semibold" },
  stable:    { dot: "bg-care-500",   pill: "bg-white text-care-700  border border-gray-200", label: "Stable",    weight: "font-medium"  },
  pending:   { dot: "bg-gray-400",   pill: "bg-white text-gray-500  border border-gray-200", label: "Pending",   weight: "font-medium"  },
  inactive:  { dot: "bg-gray-300",   pill: "bg-white text-gray-400  border border-gray-200", label: "Inactive",  weight: "font-normal"  },
};

const RISK_STYLES = {
  critical: "bg-white text-gray-900 border border-gray-200 font-bold",
  high:     "bg-white text-gray-700 border border-gray-200 font-semibold",
  medium:   "bg-white text-gray-500 border border-gray-200",
  low:      "bg-white text-gray-400 border border-gray-200",
};

export function StatusBadge({ status, className }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.inactive;
  return (
    <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs", s.pill, s.weight, className)}>
      <span className={clsx("w-1.5 h-1.5 rounded-full flex-shrink-0", s.dot)} />
      {s.label}
    </span>
  );
}

export function RiskBadge({ risk, className }) {
  const label = risk ? risk.charAt(0).toUpperCase() + risk.slice(1) : "Unknown";
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-full text-xs", RISK_STYLES[risk] || RISK_STYLES.low, className)}>
      {label} Risk
    </span>
  );
}

export function TaskBadge({ priority, className }) {
  const styles = {
    urgent: "bg-white text-gray-900 border border-gray-200 font-bold",
    high:   "bg-white text-gray-700 border border-gray-200 font-semibold",
    normal: "bg-white text-gray-500 border border-gray-200",
    low:    "bg-white text-gray-400 border border-gray-200",
  };
  const labels = { urgent: "Urgent", high: "High", normal: "Normal", low: "Low" };
  return (
    <span className={clsx("inline-flex items-center px-2 py-0.5 rounded text-xs", styles[priority] || styles.normal, className)}>
      {labels[priority] || "Normal"}
    </span>
  );
}

export function AlertSeverityBadge({ severity, className }) {
  const styles = {
    critical:      "bg-white text-gray-900 border border-gray-200 font-bold",
    warning:       "bg-white text-gray-700 border border-gray-200 font-semibold",
    informational: "bg-white text-gray-500 border border-gray-200",
  };
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-full text-xs", styles[severity] || styles.informational, className)}>
      {severity?.charAt(0).toUpperCase() + severity?.slice(1)}
    </span>
  );
}
