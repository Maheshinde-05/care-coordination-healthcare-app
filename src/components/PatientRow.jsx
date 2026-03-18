import { useState } from "react";
import { clsx } from "clsx";
import { Phone, Plus, MessageSquare, ChevronRight, AlertTriangle } from "lucide-react";
import { StatusBadge, RiskBadge } from "./ui/Badge";
import { Avatar } from "./ui/Avatar";
import { ProgressBar } from "./ui/Progress";


export function PatientRow({ patient, onSelect, isSelected }) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={() => onSelect(patient)}
      className={clsx(
        "flex items-center gap-4 px-4 py-3.5 border-b border-cara-border cursor-pointer transition-all duration-100",
        isSelected ? "bg-care-50 border-l-2 border-l-care-400" : "hover:bg-cara-muted/60",
      )}
    >
      {/* Avatar */}
      <Avatar name={patient.name} status={patient.status} size="sm" />

      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-cara-text truncate">{patient.name}</span>
          {patient.overdueAlerts > 0 && (
            <span className="flex items-center gap-0.5 text-[10px] text-gray-500 font-semibold">
              <AlertTriangle size={10} /> {patient.overdueAlerts}
            </span>
          )}
        </div>
        <div className="text-xs text-cara-textMute truncate">
          Age {patient.age} · {patient.condition}
        </div>
      </div>

      {/* Status */}
      <div className="hidden sm:block flex-shrink-0">
        <StatusBadge status={patient.status} />
      </div>

      {/* Risk */}
      <div className="hidden lg:block flex-shrink-0">
        <RiskBadge risk={patient.risk} />
      </div>

      {/* Compliance */}
      <div className="hidden lg:flex flex-col items-end gap-1 w-24 flex-shrink-0">
        <span className="text-xs font-semibold text-cara-textSub">{patient.compliance}%</span>
        <ProgressBar value={patient.compliance} size="xs" className="w-full" />
      </div>

      {/* Last contact */}
      <div className="hidden md:block flex-shrink-0 text-right">
        <div className="text-xs text-cara-textMute">Last contact</div>
        <div className="text-xs font-medium text-cara-textSub">{patient.lastContact}</div>
      </div>

      {/* Tasks badge */}
      <div className="hidden sm:flex flex-shrink-0 items-center gap-1">
        <span className={clsx(
          "text-xs font-semibold px-2 py-0.5 rounded-full",
          patient.openTasks > 0 ? "bg-care-50 text-care-700" : "bg-cara-muted text-cara-textMute"
        )}>
          {patient.openTasks} tasks
        </span>
      </div>

      {/* Quick actions */}
      <div className={clsx(
        "flex-shrink-0 flex items-center gap-1 transition-opacity duration-150",
        showActions ? "opacity-100" : "opacity-0"
      )}>
        <button
          className="p-1.5 rounded-lg hover:bg-care-100 text-care-600 transition-colors"
          title="Log call"
          onClick={e => { e.stopPropagation(); }}
        >
          <Phone size={14} />
        </button>
        <button
          className="p-1.5 rounded-lg hover:bg-cara-muted text-cara-textMute transition-colors"
          title="Send message"
          onClick={e => { e.stopPropagation(); }}
        >
          <MessageSquare size={14} />
        </button>
        <button
          className="p-1.5 rounded-lg hover:bg-cara-muted text-cara-textMute transition-colors"
          title="Add task"
          onClick={e => { e.stopPropagation(); }}
        >
          <Plus size={14} />
        </button>
      </div>

      <ChevronRight size={14} className={clsx("flex-shrink-0 text-cara-textMute transition-transform", isSelected && "rotate-90")} />
    </div>
  );
}
