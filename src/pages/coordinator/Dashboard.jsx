import { useState } from "react";
import { clsx } from "clsx";
import { Search, Plus, Users } from "lucide-react";
import { PATIENTS } from "../../data/mockData";
import { Avatar } from "../../components/ui/Avatar";
import { ProgressBar } from "../../components/ui/Progress";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { PatientProfile } from "./PatientProfile";

const STATUS_FILTERS = ["all", "critical", "attention", "stable", "pending", "inactive"];

function getStatusCount(patients, status) {
  if (status === "all") return patients.length;
  return patients.filter(p => p.status === status).length;
}

// ── Status dot colors ───────────────────────────────────────────────
const STATUS_DOTS = {
  critical:  "bg-gray-800",
  attention: "bg-gray-500",
  stable:    "bg-care-500",
  pending:   "bg-gray-400",
  inactive:  "bg-gray-300",
};

// ── Compact patient card for left list ─────────────────────────────
function PatientListCard({ patient, selected, onClick }) {
  return (
    <button
      onClick={() => onClick(patient)}
      className={clsx(
        "w-full text-left px-4 py-3.5 border-b border-cara-border transition-all duration-100 focus:outline-none",
        "border-l-[3px]",
        selected
          ? "bg-care-50 border-l-care-500"
          : "bg-white hover:bg-cara-muted/40 border-l-transparent"
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar name={patient.name} status={patient.status} size="sm" />

        <div className="flex-1 min-w-0">
          {/* Name + status dot */}
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className={clsx(
              "text-[13px] font-bold truncate leading-tight",
              selected ? "text-care-700" : "text-cara-text"
            )}>
              {patient.name}
            </span>
            <span className="flex-shrink-0 flex items-center gap-1 text-[10px] font-medium text-cara-textMute">
              <span className={clsx("w-1.5 h-1.5 rounded-full", STATUS_DOTS[patient.status] || "bg-gray-300")} />
              {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
            </span>
          </div>

          {/* Condition + age */}
          <p className="text-[11px] text-cara-textMute truncate mb-2">
            {patient.condition} · Age {patient.age}
          </p>

          {/* Compliance bar */}
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] font-semibold uppercase tracking-wide text-cara-textMute">Compliance</span>
              <span className="text-[10px] font-bold text-cara-textSub">{patient.compliance}%</span>
            </div>
            <ProgressBar value={patient.compliance} size="xs" />
          </div>

          {/* Last contact + tasks */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-cara-textMute">
              Last: <span className="font-medium text-cara-textSub">{patient.lastContact}</span>
            </span>
            {patient.openTasks > 0 && (
              <span className="text-[9px] font-semibold text-care-700 bg-care-50 border border-care-100 px-1.5 py-0.5 rounded-full">
                {patient.openTasks} tasks
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

// ── Empty right-panel state ─────────────────────────────────────────
function EmptyDetailState() {
  return (
    <div className="flex-1 flex items-center justify-center bg-cara-muted/20">
      <div className="text-center max-w-xs">
        <div className="w-14 h-14 rounded-2xl bg-white border border-cara-border shadow-xs flex items-center justify-center mx-auto mb-4">
          <Users size={22} className="text-cara-textMute" />
        </div>
        <h3 className="text-sm font-bold text-cara-text mb-1">Select a patient</h3>
        <p className="text-xs text-cara-textMute leading-relaxed">
          Choose a patient from the list to view their profile, care plan, labs, and more.
        </p>
      </div>
    </div>
  );
}

// ── Main split-pane dashboard ───────────────────────────────────────
export function CoordinatorDashboard({ onCreateTemplate }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filtered = PATIENTS.filter(p => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase()) ||
      p.mrn.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  }).sort((a, b) => {
    const order = { critical: 0, attention: 1, pending: 2, stable: 3, inactive: 4 };
    return (order[a.status] ?? 5) - (order[b.status] ?? 5);
  });

  return (
    <div className="flex flex-1 overflow-hidden">

      {/* ── LEFT: Patient list ── */}
      <div className="w-[300px] flex-shrink-0 border-r border-cara-border flex flex-col overflow-hidden bg-white">

        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-cara-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-black text-cara-text tracking-tight">Caseload</h2>
              <p className="text-[10px] text-cara-textMute mt-0.5">
                {PATIENTS.length} patients · {getStatusCount(PATIENTS, "critical")} critical
              </p>
            </div>
            <Button variant="primary" size="xs" icon={Plus}>New</Button>
          </div>

          <Input
            icon={Search}
            placeholder="Search patients…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full mb-2.5"
          />

          {/* Status filter pills */}
          <div className="flex gap-1 overflow-x-auto pb-0.5">
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={clsx(
                  "px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize transition-all flex-shrink-0",
                  statusFilter === s
                    ? "bg-care-500 text-white"
                    : "bg-cara-muted text-cara-textSub hover:text-cara-text"
                )}
              >
                {s === "all" ? `All ${PATIENTS.length}` : `${s} ${getStatusCount(PATIENTS, s)}`}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-12 text-center px-4">
              <p className="text-xs text-cara-textMute">No patients match.</p>
              <button
                onClick={() => { setSearch(""); setStatusFilter("all"); }}
                className="text-xs text-care-600 mt-1.5 underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filtered.map(p => (
              <PatientListCard
                key={p.id}
                patient={p}
                selected={selectedPatient?.id === p.id}
                onClick={setSelectedPatient}
              />
            ))
          )}
        </div>
      </div>

      {/* ── RIGHT: Patient detail ── */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {selectedPatient
          ? <PatientProfile
              patient={selectedPatient}
              panelMode
              onCreateTemplate={onCreateTemplate}
            />
          : <EmptyDetailState />
        }
      </div>

    </div>
  );
}
