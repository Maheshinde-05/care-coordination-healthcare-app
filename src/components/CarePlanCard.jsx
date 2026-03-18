import { useState } from "react";
import { clsx } from "clsx";
import { CheckCircle2, Circle, Clock, ChevronDown, ChevronUp, Calendar, User } from "lucide-react";
import { Card, CardHeader, CardBody } from "./ui/Card";
import { ProgressBar, CircularProgress } from "./ui/Progress";
import { Button } from "./ui/Button";

function GoalRow({ goal, onToggle }) {
  return (
    <div className={clsx(
      "flex items-start gap-3 py-3 border-b border-cara-border last:border-0",
      goal.completed && "opacity-60"
    )}>
      <button onClick={() => onToggle(goal.id)} className="mt-0.5 flex-shrink-0">
        {goal.completed
          ? <CheckCircle2 size={17} className="text-care-500" />
          : <Circle size={17} className="text-cara-textMute hover:text-care-500 transition-colors" />
        }
      </button>
      <div className="flex-1 min-w-0">
        <p className={clsx("text-sm font-medium text-cara-text", goal.completed && "line-through text-cara-textMute")}>
          {goal.title}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-cara-textMute">
            <User size={11} /> {goal.owner}
          </span>
          <span className="flex items-center gap-1 text-xs text-cara-textMute">
            <Calendar size={11} /> Due {goal.dueDate}
          </span>
        </div>
      </div>
      <div className={clsx(
        "text-xs font-semibold px-2 py-0.5 rounded flex-shrink-0",
        goal.priority === "high" ? "bg-white text-gray-700 border border-gray-200" :
        goal.priority === "urgent" ? "bg-white text-gray-900 font-bold border border-gray-200" :
        "bg-cara-muted text-cara-textSub"
      )}>
        {goal.priority}
      </div>
    </div>
  );
}

export function CarePlanCard({ plan, onGoalToggle, compact = false }) {
  const [expanded, setExpanded] = useState(!compact);
  const completed = plan.goals.filter(g => g.completed).length;
  const total     = plan.goals.length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Card variant="default" className="overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute mb-1">Active Care Plan</p>
            <h3 className="text-base font-bold text-cara-text leading-snug">{plan.name}</h3>
            <p className="text-xs text-cara-textMute mt-0.5">
              Started {plan.startDate} · {plan.coordinator}
            </p>
          </div>
          <CircularProgress
            value={pct}
            max={100}
            size={56}
            strokeWidth={5}
            label={`${pct}%`}
            sublabel="done"
          />
        </div>
      </CardHeader>

      <CardBody className="pt-3">
        {/* Care days */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-care-50 border border-care-200 rounded-xl p-3">
            <div className="text-xs text-care-700 font-semibold uppercase tracking-wide mb-1">Care Days</div>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-care-800">{plan.careDaysCompleted}</span>
              <span className="text-sm text-care-600 pb-0.5">/ {plan.careDaysAllotted}</span>
            </div>
            <ProgressBar value={plan.careDaysCompleted} max={plan.careDaysAllotted} size="xs" className="mt-2" />
          </div>
          <div className="bg-white border border-cara-border rounded-xl p-3">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Compliance</div>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-gray-900">{plan.compliance}%</span>
            </div>
            <ProgressBar value={plan.compliance} size="xs"  className="mt-2" />
          </div>
        </div>

        {/* Goals */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-cara-textSub">
              Goals · {completed}/{total} complete
            </span>
            <button
              onClick={() => setExpanded(v => !v)}
              className="text-xs text-care-600 font-medium flex items-center gap-0.5 hover:text-care-700"
            >
              {expanded ? "Collapse" : "Show all"}
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>

          {expanded && (
            <div className="animate-slide-up">
              {plan.goals.map(g => (
                <GoalRow key={g.id} goal={g} onToggle={onGoalToggle} />
              ))}
            </div>
          )}
          {!expanded && (
            <ProgressBar value={completed} max={total} size="sm" />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
