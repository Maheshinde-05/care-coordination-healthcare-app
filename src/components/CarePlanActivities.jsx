import { useState } from "react";
import { clsx } from "clsx";
import {
  Pill, FlaskConical, Utensils, Dumbbell, BookOpen, Flag,
  CheckCircle2, Circle, Clock,
} from "lucide-react";
import { ProgressBar, CircularProgress } from "./ui/Progress";

const ACTIVITY_TYPE = {
  medicine:  { icon: Pill,          color: "bg-gray-100 text-gray-500" },
  lab:       { icon: FlaskConical,  color: "bg-gray-100 text-gray-500" },
  diet:      { icon: Utensils,      color: "bg-care-50  text-care-700" },
  exercise:  { icon: Dumbbell,      color: "bg-gray-100 text-gray-500" },
  education: { icon: BookOpen,      color: "bg-gray-100 text-gray-500" },
  milestone: { icon: Flag,          color: "bg-gray-100 text-gray-500" },
};

const STATUS_TABS = ["All", "Upcoming", "Overdue", "Missed", "Completed"];

const STATUS_DOT = {
  upcoming:  "bg-care-400",
  overdue:   "bg-gray-600",
  missed:    "bg-gray-400",
  completed: "bg-care-500",
};

function ActivityRow({ activity, onToggle }) {
  const cfg = ACTIVITY_TYPE[activity.type] || ACTIVITY_TYPE.milestone;
  const IconComp = cfg.icon;
  const done = activity.status === "completed";
  const isOverdue = activity.status === "overdue";

  return (
    <div
      className={clsx(
        "flex items-start gap-3 py-3.5 border-b border-cara-border last:border-0",
        "hover:bg-cara-muted/40 transition-colors",
        isOverdue && "border-l-2 border-l-gray-400 pl-3",
      )}
    >
      {/* Scheduled time */}
      <div className="w-14 flex-shrink-0 pt-0.5 text-right">
        <span className="text-[10px] text-cara-textMute font-medium leading-none">
          {activity.scheduledTime}
        </span>
      </div>

      {/* Activity type icon */}
      <div className={clsx("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5", cfg.color)}>
        <IconComp size={14} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className={clsx(
              "text-sm font-semibold text-cara-text leading-tight",
              done && "line-through text-cara-textMute"
            )}>
              {activity.name}
            </p>
            <p className="text-[11px] text-cara-textMute mt-1 leading-relaxed">
              {activity.summary}
            </p>
            {activity.notes && (
              <p className="text-[10px] text-cara-textMute italic mt-1 bg-cara-muted px-2 py-1 rounded-lg inline-block">
                {activity.notes}
              </p>
            )}
          </div>

          {/* Day range */}
          <div className="flex-shrink-0 text-right">
            <span className="text-[10px] font-medium text-cara-textMute bg-cara-muted px-2 py-0.5 rounded-full">
              {activity.dayRange}
            </span>
          </div>
        </div>
      </div>

      {/* Status dot + complete toggle */}
      <div className="flex items-center gap-2 flex-shrink-0 mt-1">
        <div className={clsx("w-1.5 h-1.5 rounded-full", STATUS_DOT[activity.status] || "bg-gray-300")} />
        <button onClick={() => onToggle(activity.id)} title={done ? "Mark incomplete" : "Mark complete"}>
          {done
            ? <CheckCircle2 size={16} className="text-care-500" />
            : <Circle size={16} className="text-cara-textMute hover:text-care-500 transition-colors" />
          }
        </button>
      </div>
    </div>
  );
}

export function CarePlanActivities({ plan }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activities, setActivities] = useState(plan.activities || []);

  function toggleActivity(id) {
    setActivities(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, status: a.status === "completed" ? "upcoming" : "completed" }
          : a
      )
    );
  }

  const counts = {
    All:       activities.length,
    Upcoming:  activities.filter(a => a.status === "upcoming").length,
    Overdue:   activities.filter(a => a.status === "overdue").length,
    Missed:    activities.filter(a => a.status === "missed").length,
    Completed: activities.filter(a => a.status === "completed").length,
  };

  const filtered = activities.filter(a =>
    activeFilter === "All" || a.status === activeFilter.toLowerCase()
  );

  const completedCount = activities.filter(a => a.status === "completed").length;
  const pct = activities.length > 0 ? Math.round((completedCount / activities.length) * 100) : 0;

  return (
    <div className="bg-white border border-cara-border rounded-2xl overflow-hidden">

      {/* Plan header */}
      <div className="px-6 pt-5 pb-4 border-b border-cara-border">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute mb-1">
              Active Care Plan
            </p>
            <h3 className="text-base font-bold text-cara-text leading-snug">{plan.name}</h3>
            <p className="text-xs text-cara-textMute mt-0.5">
              Started {plan.startDate} · {plan.coordinator} · {plan.careDaysAllotted} day plan
            </p>
          </div>
          <CircularProgress
            value={pct}
            max={100}
            size={52}
            strokeWidth={5}
            label={`${pct}%`}
            sublabel="done"
          />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-care-50 border border-care-200 rounded-xl p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-care-700 mb-1">Care Days</div>
            <div className="flex items-end gap-1">
              <span className="text-xl font-bold text-care-800">{plan.careDaysCompleted}</span>
              <span className="text-sm text-care-600 pb-0.5">/ {plan.careDaysAllotted}</span>
            </div>
            <ProgressBar value={plan.careDaysCompleted} max={plan.careDaysAllotted} size="xs" className="mt-2" />
          </div>
          <div className="bg-white border border-cara-border rounded-xl p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Compliance</div>
            <div className="text-xl font-bold text-gray-900">{plan.compliance}%</div>
            <ProgressBar value={plan.compliance} size="xs" className="mt-2" />
          </div>
        </div>
      </div>

      {/* Activity count + filter tabs */}
      <div className="px-6 pt-4 pb-3 border-b border-cara-border flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-cara-textSub">Activities</span>
          <span className="text-xs font-semibold text-white bg-care-500 px-1.5 py-0.5 rounded-full">
            {activities.length}
          </span>
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {STATUS_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={clsx(
                "px-2.5 py-1 rounded-full text-xs font-semibold transition-all flex-shrink-0",
                activeFilter === tab
                  ? "bg-care-500 text-white"
                  : "bg-white text-cara-textSub border border-cara-border hover:border-care-300 hover:text-care-700"
              )}
            >
              {tab}
              {counts[tab] > 0 && activeFilter !== tab && (
                <span className="ml-1 opacity-60">({counts[tab]})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Activity list */}
      <div className="px-3">
        {filtered.length === 0 ? (
          <div className="py-14 text-center">
            <Clock size={24} className="text-cara-textMute mx-auto mb-2 opacity-40" />
            <p className="text-sm text-cara-textMute">No {activeFilter.toLowerCase()} activities.</p>
          </div>
        ) : (
          filtered.map(a => (
            <ActivityRow key={a.id} activity={a} onToggle={toggleActivity} />
          ))
        )}
      </div>
    </div>
  );
}
