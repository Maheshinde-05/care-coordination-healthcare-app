import { useState } from "react";
import { clsx } from "clsx";
import { CheckCircle2, Circle, Clock, User, CalendarClock, ChevronRight } from "lucide-react";
import { TaskBadge } from "./ui/Badge";
import { Avatar } from "./ui/Avatar";

function isOverdue(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  return due < today;
}

function formatDue(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff < 0) return `${Math.abs(diff)}d overdue`;
  return `In ${diff}d`;
}

export function TaskRow({ task, onComplete, onSelect, compact = false }) {
  const [done, setDone] = useState(task.completed);
  const overdue = !done && isOverdue(task.dueDate);

  function handleToggle(e) {
    e.stopPropagation();
    setDone(v => !v);
    onComplete?.(task.id, !done);
  }

  return (
    <div
      onClick={() => onSelect?.(task)}
      className={clsx(
        "flex items-center gap-3 px-4 py-3 border-b border-cara-border last:border-0",
        "hover:bg-cara-muted/50 cursor-pointer transition-colors duration-100",
        overdue && "border-l-2 border-l-gray-300 bg-gray-50/50",
        done && "opacity-50"
      )}
    >
      <button onClick={handleToggle} className="flex-shrink-0 mt-0.5">
        {done
          ? <CheckCircle2 size={17} className="text-care-500" />
          : <Circle size={17} className={clsx("transition-colors", overdue ? "text-gray-400" : "text-cara-textMute hover:text-care-500")} />
        }
      </button>

      <div className="flex-1 min-w-0">
        <p className={clsx("text-sm font-medium text-cara-text truncate", done && "line-through text-cara-textMute")}>
          {task.title}
        </p>
        {!compact && (
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            {task.patientName && (
              <span className="flex items-center gap-1 text-xs text-cara-textMute">
                <User size={10} /> {task.patientName}
              </span>
            )}
            <span className={clsx(
              "flex items-center gap-1 text-xs font-medium",
              overdue ? "text-gray-500" : "text-cara-textMute"
            )}>
              <CalendarClock size={10} /> {formatDue(task.dueDate)}
            </span>
          </div>
        )}
      </div>

      <TaskBadge priority={task.priority} />

      {task.assignee && !compact && (
        <Avatar name={task.assignee} size="xs" />
      )}

      <ChevronRight size={13} className="flex-shrink-0 text-cara-textMute" />
    </div>
  );
}
