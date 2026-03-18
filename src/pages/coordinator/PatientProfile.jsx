import { useState } from "react";
import { clsx } from "clsx";
import {
  ArrowLeft, Phone, MessageSquare, Plus, Stethoscope,
  FlaskConical, Clock, FileText, AlertTriangle, LayoutTemplate
} from "lucide-react";
import { StatusBadge, RiskBadge } from "../../components/ui/Badge";
import { Avatar } from "../../components/ui/Avatar";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { CarePlanCard } from "../../components/CarePlanCard";
import { CarePlanActivities } from "../../components/CarePlanActivities";
import { AIInsightCard } from "../../components/AIInsightCard";
import { Button } from "../../components/ui/Button";

const LAB_STATUS_STYLE = {
  high:   { bg: "bg-white text-gray-800 border border-gray-200 font-bold", label: "High"       },
  low:    { bg: "bg-white text-gray-600 border border-gray-200",           label: "Low"        },
  border: { bg: "bg-white text-gray-500 border border-gray-200",           label: "Borderline" },
  normal: { bg: "bg-white text-care-700 border border-gray-200",           label: "Normal"     },
};

const TIMELINE_ICONS = {
  call:      { icon: Phone,         color: "bg-care-50  text-care-600"  },
  message:   { icon: MessageSquare, color: "bg-gray-100 text-gray-600"  },
  lab:       { icon: FlaskConical,  color: "bg-gray-100 text-gray-600"  },
  alert:     { icon: AlertTriangle, color: "bg-gray-100 text-gray-700"  },
  careplan:  { icon: FileText,      color: "bg-care-50  text-care-600"  },
  appointment: { icon: Clock,       color: "bg-care-50  text-care-600"  },
};

function LabRow({ lab }) {
  const s = LAB_STATUS_STYLE[lab.status] || LAB_STATUS_STYLE.normal;
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-cara-border last:border-0">
      <FlaskConical size={14} className={clsx("flex-shrink-0", lab.flag ? "text-gray-700 font-bold" : "text-cara-textMute")} />
      <div className="flex-1">
        <span className="text-sm font-medium text-cara-text">{lab.name}</span>
        <span className="text-xs text-cara-textMute ml-2">{lab.date}</span>
      </div>
      <span className="text-sm font-semibold text-cara-textSub">{lab.result}</span>
      <span className={clsx("text-[10px] font-bold px-1.5 py-0.5 rounded", s.bg)}>{s.label}</span>
    </div>
  );
}

function DoctorRow({ doc }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-cara-border last:border-0">
      <div className="w-9 h-9 rounded-xl bg-care-50 flex items-center justify-center text-care-600 flex-shrink-0">
        <Stethoscope size={16} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-cara-text">{doc.name}</div>
        <div className="text-xs text-cara-textMute">{doc.specialty} · {doc.facility}</div>
      </div>
      <div className="text-right">
        <div className="text-[10px] text-cara-textMute">Last visit</div>
        <div className="text-xs font-medium text-cara-textSub">{doc.lastVisit}</div>
      </div>
    </div>
  );
}

function TimelineItem({ event }) {
  const cfg = TIMELINE_ICONS[event.type] || TIMELINE_ICONS.call;
  const IconComp = cfg.icon;
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={clsx("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", cfg.color)}>
          <IconComp size={14} />
        </div>
        <div className="w-px flex-1 bg-cara-border mt-1.5" />
      </div>
      <div className="flex-1 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs text-cara-textMute">{event.date} · {event.time}</span>
            <p className="text-sm font-medium text-cara-text mt-0.5">{event.summary}</p>
          </div>
          <span className="text-[10px] text-cara-textMute flex-shrink-0 ml-3">{event.author}</span>
        </div>
      </div>
    </div>
  );
}

const TABS = ["Overview", "Care Plan", "Labs", "Doctors", "Timeline"];

export function PatientProfile({ patient, onBack, onCreateTemplate, panelMode = false }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [goals, setGoals] = useState(patient.carePlan.goals);

  function toggleGoal(id) {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  }

  const planWithGoals = { ...patient.carePlan, goals };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Sticky header */}
      <div className="bg-cara-surface border-b border-cara-border px-4 md:px-6 pt-4 pb-0 flex-shrink-0">
        {!panelMode && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-cara-textMute hover:text-cara-text mb-4 transition-colors"
          >
            <ArrowLeft size={13} /> Back to caseload
          </button>
        )}

        <div className="flex items-start gap-4 flex-wrap">
          <Avatar name={patient.name} status={patient.status} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1
                className="font-black text-cara-text tracking-tight leading-none"
                style={{ fontSize: "clamp(1.25rem,3vw,1.75rem)", letterSpacing: "-0.03em" }}
              >
                {patient.name}
              </h1>
              <StatusBadge status={patient.status} />
              <RiskBadge risk={patient.risk} />
            </div>
            <div className="text-sm text-cara-textMute mt-1">
              Age {patient.age} · DOB {patient.dob} · {patient.mrn}
            </div>
            <div className="text-sm text-cara-textSub font-medium">{patient.condition}</div>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="text-xs text-cara-textMute">Coordinator: <strong className="text-cara-textSub">{patient.coordinator}</strong></span>
              <span className="text-xs text-cara-textMute">· {patient.openTasks} tasks</span>
              <span className="text-xs text-cara-textMute">· Last: <strong className="text-cara-textSub">{patient.lastContact}</strong></span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="care" size="sm" icon={Phone}>Log Call</Button>
            <Button variant="secondary" size="sm" icon={MessageSquare}>Message</Button>
            <Button variant="secondary" size="sm" icon={Plus}>Add Task</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mt-5">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-4 py-2.5 text-xs font-bold uppercase tracking-wide border-b-2 transition-all",
                activeTab === tab
                  ? "border-care-500 text-care-700"
                  : "border-transparent text-cara-textMute hover:text-cara-text"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* ── OVERVIEW ── */}
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* AI Summary */}
              <AIInsightCard
                title="Pre-Call AI Summary"
                insights={[
                  { text: patient.aiSummary.trends },
                  ...patient.aiSummary.openIssues.map(i => ({ text: i, urgent: true })),
                  ...patient.aiSummary.talkingPoints.map(t => ({ text: `Talking point: ${t}` })),
                ]}
              />

              {/* Care plan compact */}
              <CarePlanCard plan={planWithGoals} onGoalToggle={toggleGoal} compact />
            </div>

            <div className="flex flex-col gap-5">
              {/* Contact info */}
              <Card variant="default">
                <CardHeader>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute">Contact</p>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="flex flex-col gap-2">
                    <div>
                      <div className="text-[10px] text-cara-textMute uppercase tracking-wide">Phone</div>
                      <div className="text-sm font-medium text-cara-text">{patient.phone}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-cara-textMute uppercase tracking-wide">Emergency Contact</div>
                      <div className="text-sm font-medium text-cara-text">{patient.emergencyContact}</div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Quick labs */}
              <Card variant="default">
                <CardHeader>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute">Recent Labs</p>
                </CardHeader>
                <CardBody className="pt-0">
                  {patient.labs.slice(0, 3).map((lab, i) => <LabRow key={i} lab={lab} />)}
                  <button onClick={() => setActiveTab("Labs")} className="text-xs text-care-600 mt-2 hover:underline">
                    View all labs →
                  </button>
                </CardBody>
              </Card>

              {/* Quick doctors */}
              <Card variant="default">
                <CardHeader>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute">Care Team</p>
                </CardHeader>
                <CardBody className="pt-0">
                  {patient.doctors.slice(0, 2).map((doc, i) => <DoctorRow key={i} doc={doc} />)}
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {/* ── CARE PLAN ── */}
        {activeTab === "Care Plan" && (
          <div className="max-w-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-cara-textMute">
                Activities scheduled for this care plan
              </p>
              <Button variant="secondary" size="sm" icon={LayoutTemplate} onClick={onCreateTemplate}>
                Create Template
              </Button>
            </div>
            {patient.carePlan.activities?.length > 0
              ? <CarePlanActivities plan={patient.carePlan} />
              : <CarePlanCard plan={planWithGoals} onGoalToggle={toggleGoal} compact={false} />
            }
          </div>
        )}

        {/* ── LABS ── */}
        {activeTab === "Labs" && (
          <div className="flex gap-4 items-start">

            {/* Left: compact lab results */}
            <div className="w-64 flex-shrink-0">
              <Card variant="default">
                <CardHeader className="pb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute">Lab Results</p>
                </CardHeader>
                <CardBody className="pt-0">
                  {patient.labs.map((lab, i) => <LabRow key={i} lab={lab} />)}
                </CardBody>
              </Card>
            </div>

            {/* Right: imaging */}
            <div className="flex-1 flex flex-col gap-4">

              {/* Chest X-ray */}
              <Card variant="default">
                <CardHeader className="pb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute">Imaging</p>
                  <h3 className="text-sm font-bold text-cara-text">Chest X-Ray — PA View</h3>
                  <p className="text-xs text-cara-textMute">Mar 10, 2026 · Radiology Dept</p>
                </CardHeader>
                <CardBody className="pt-0">
                  <img
                    src="/chest-xray.jpeg"
                    alt="Chest X-Ray"
                    className="w-full rounded-xl object-cover border border-cara-border"
                    style={{ maxHeight: 260 }}
                  />
                  <p className="text-xs text-cara-textMute mt-2">
                    <span className="font-semibold text-cara-textSub">Impression:</span> No acute cardiopulmonary process. Heart size normal. Lungs clear bilaterally.
                  </p>
                </CardBody>
              </Card>

              {/* ECG */}
              <Card variant="default">
                <CardHeader className="pb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute">Cardiac</p>
                  <h3 className="text-sm font-bold text-cara-text">12-Lead ECG</h3>
                  <p className="text-xs text-cara-textMute">Feb 15, 2026 · Cardiology</p>
                </CardHeader>
                <CardBody className="pt-0">
                  <img
                    src="/ecg-12lead.jpg"
                    alt="12-Lead ECG"
                    className="w-full rounded-xl object-cover border border-cara-border"
                    style={{ maxHeight: 220 }}
                  />
                  <p className="text-xs text-cara-textMute mt-2">
                    <span className="font-semibold text-cara-textSub">Interpretation:</span> Normal sinus rhythm. Rate 72 bpm. No ST changes. QTc 420 ms — within normal limits.
                  </p>
                </CardBody>
              </Card>

            </div>
          </div>
        )}

        {/* ── DOCTORS ── */}
        {activeTab === "Doctors" && (
          <div className="max-w-2xl">
            <Card variant="default">
              <CardHeader>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute">Care Team</p>
                <h2 className="text-lg font-bold text-cara-text">Physicians & Specialists</h2>
              </CardHeader>
              <CardBody className="pt-0">
                {patient.doctors.map((doc, i) => <DoctorRow key={i} doc={doc} />)}
              </CardBody>
            </Card>
          </div>
        )}

        {/* ── TIMELINE ── */}
        {activeTab === "Timeline" && (
          <div className="max-w-2xl">
            <div className="bg-cara-surface border border-cara-border rounded-2xl p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute mb-4">Care Timeline</p>
              {patient.timeline.map((event) => (
                <TimelineItem key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
