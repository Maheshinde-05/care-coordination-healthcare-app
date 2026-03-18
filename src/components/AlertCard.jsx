import { clsx } from "clsx";
import { AlertTriangle, Info, ArrowUpRight, Bell, CheckCheck, X } from "lucide-react";
import { AlertSeverityBadge } from "./ui/Badge";
import { Button } from "./ui/Button";

const SEVERITY_STYLES = {
  critical:      { bg: "bg-alert-50   border-alert-200",   icon: "text-alert-500",   Icon: AlertTriangle },
  warning:       { bg: "bg-caution-50 border-caution-200", icon: "text-caution-500", Icon: Bell },
  informational: { bg: "bg-clarity-50 border-clarity-200", icon: "text-clarity-500", Icon: Info },
};

export function AlertCard({ alert, onAcknowledge, onEscalate, onDismiss }) {
  const s = SEVERITY_STYLES[alert.severity] || SEVERITY_STYLES.informational;
  const SvgIcon = s.Icon;

  return (
    <div className={clsx(
      "rounded-xl border p-4 flex gap-3 transition-all duration-200",
      s.bg,
      alert.severity === "critical" && "shadow-md"
    )}>
      <div className={clsx("flex-shrink-0 mt-0.5", s.icon)}>
        <SvgIcon size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <AlertSeverityBadge severity={alert.severity} className="mb-1" />
            <p className="text-sm font-semibold text-cara-text">{alert.patientName}</p>
          </div>
          <span className="text-xs text-cara-textMute flex-shrink-0">{alert.time}</span>
        </div>
        <p className="text-sm text-cara-textSub">{alert.message}</p>
        {alert.suggestedAction && (
          <p className="text-xs text-cara-textMute mt-1 italic">Suggested: {alert.suggestedAction}</p>
        )}

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {!alert.acknowledged && (
            <Button variant="care" size="xs" onClick={() => onAcknowledge?.(alert.id)}>
              <CheckCheck size={12} /> Acknowledge
            </Button>
          )}
          {alert.severity !== "informational" && (
            <Button variant="secondary" size="xs" onClick={() => onEscalate?.(alert)}>
              <ArrowUpRight size={12} /> Escalate
            </Button>
          )}
          <button
            onClick={() => onDismiss?.(alert.id)}
            className="p-1 rounded-lg hover:bg-white/60 text-cara-textMute transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
