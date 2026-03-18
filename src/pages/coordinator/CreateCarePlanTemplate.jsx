import { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import {
  ArrowLeft, Send, Sparkles, Plus, Trash2,
  Pill, FlaskConical, Utensils, Dumbbell, BookOpen, Flag, Save,
  User, CalendarRange, Tag, ChevronDown, X,
} from "lucide-react";
import { Button } from "../../components/ui/Button";

// ── Activity type config ────────────────────────────────────────────
const ACTIVITY_TYPES = [
  { key: "medicine",  label: "Medicine",  icon: Pill,         color: "bg-gray-100 text-gray-600" },
  { key: "lab",       label: "Lab",       icon: FlaskConical, color: "bg-gray-100 text-gray-600" },
  { key: "diet",      label: "Diet",      icon: Utensils,     color: "bg-care-50  text-care-700" },
  { key: "exercise",  label: "Exercise",  icon: Dumbbell,     color: "bg-gray-100 text-gray-600" },
  { key: "education", label: "Education", icon: BookOpen,     color: "bg-gray-100 text-gray-600" },
  { key: "milestone", label: "Milestone", icon: Flag,         color: "bg-gray-100 text-gray-600" },
];

// ── Mock AI logic ───────────────────────────────────────────────────
function normalizeCondition(input) {
  const l = input.toLowerCase();
  if (l.includes("diabetes") || l.includes("diabetic") || l.includes("blood sugar"))
    return "Type 2 Diabetes";
  if (l.includes("hypertension") || l.includes("blood pressure") || l.includes("bp"))
    return "Hypertension";
  if (l.includes("heart failure") || l.includes("cardiac") || l.includes("chf"))
    return "Heart Failure";
  if (l.includes("anxiety") || l.includes("mental health") || l.includes("depression"))
    return "Anxiety Disorder";
  if (l.includes("post") || l.includes("surgery") || l.includes("recovery") || l.includes("hip") || l.includes("knee"))
    return "Post-Op Recovery";
  if (l.includes("fatigue") || l.includes("chronic"))
    return "Chronic Fatigue";
  return input.trim();
}

const CONDITION_ACTIVITIES = {
  "Type 2 Diabetes": [
    { type: "medicine",  name: "Metformin 500mg",                 dayRange: "Day 1 – Day 90",  summary: "Metformin 500mg · Once a day · 90 days · by mouth · before breakfast · Everyday",     scheduledTime: "8:00 am",  status: "upcoming", notes: "Take with food to reduce GI side effects" },
    { type: "lab",       name: "HbA1c, Fasting Glucose, eGFR",   dayRange: "Day 1 – Day 90",  summary: "HbA1c, Fasting Glucose, eGFR · Once in 30 days · duration 90 days",                   scheduledTime: "9:00 am",  status: "upcoming", notes: "Patient must fast 8 hours before lab" },
    { type: "diet",      name: "Low-carb meal plan",              dayRange: "Day 1 – Day 90",  summary: "Low-carb diet · Once a day · Avoid refined carbs and sugary drinks",                   scheduledTime: "12:30 pm", status: "upcoming", notes: "Drink plenty of water with meals" },
    { type: "exercise",  name: "30-minute brisk walk",            dayRange: "Day 1 – Day 90",  summary: "30-min walk · Once a day · Everyday · Morning or after dinner",                        scheduledTime: "7:00 am",  status: "upcoming", notes: "" },
    { type: "education", name: "Diabetes self-management education", dayRange: "Day 1 – Day 30", summary: "DSME program · Once a week · 30 days · Community health program",                  scheduledTime: "10:00 am", status: "upcoming", notes: "Enroll in certified diabetes education program" },
  ],
  "Hypertension": [
    { type: "medicine",  name: "Amlodipine 5mg",                dayRange: "Day 1 – Day 120", summary: "Amlodipine 5mg · Once a day · 120 days · by mouth · morning · Everyday",              scheduledTime: "8:00 am",  status: "upcoming", notes: "" },
    { type: "exercise",  name: "Home BP check (morning & evening)", dayRange: "Day 1 – Day 120", summary: "BP check · Twice a day · 120 days · Log readings in diary",                       scheduledTime: "8:00 am",  status: "upcoming", notes: "Alert if > 145/90 mmHg" },
    { type: "diet",      name: "DASH / Low-sodium diet",         dayRange: "Day 1 – Day 120", summary: "Low-sodium diet (<1500mg/day) · Everyday · Avoid processed foods",                    scheduledTime: "12:00 pm", status: "upcoming", notes: "Review DASH diet guidelines" },
    { type: "lab",       name: "BMP, Lipid Panel, eGFR",        dayRange: "Day 30 – Day 120",summary: "BMP, Lipid Panel, eGFR · Once in 30 days · start day 30",                             scheduledTime: "9:00 am",  status: "upcoming", notes: "" },
  ],
  "Heart Failure": [
    { type: "exercise",  name: "Daily weight monitoring",        dayRange: "Day 1 – Day 180", summary: "Weight check · Once a day · 180 days · Every morning before eating",                  scheduledTime: "7:00 am",  status: "upcoming", notes: "Alert care team if > 3 lb gain in 24 hrs" },
    { type: "medicine",  name: "Furosemide 40mg",               dayRange: "Day 1 – Day 180", summary: "Furosemide 40mg · Once a day · 180 days · by mouth · morning · Everyday",             scheduledTime: "8:00 am",  status: "upcoming", notes: "Monitor potassium levels. Avoid afternoon dosing." },
    { type: "diet",      name: "Fluid restriction (2L/day)",    dayRange: "Day 1 – Day 180", summary: "Fluid restriction · Max 2L/day · Track all fluid intake",                              scheduledTime: "12:00 pm", status: "upcoming", notes: "Include soups, ice cream, gelatin in fluid count" },
    { type: "lab",       name: "BNP, BMP, CBC",                 dayRange: "Day 30 – Day 180",summary: "BNP, BMP, CBC · Once a month · 180 days · Heart failure markers",                     scheduledTime: "9:00 am",  status: "upcoming", notes: "" },
    { type: "education", name: "Cardiac rehab program",         dayRange: "Day 30 – Day 180",summary: "Cardiac rehab · 3x per week · 150 days · Heart & Vascular Institute",                 scheduledTime: "9:00 am",  status: "upcoming", notes: "" },
  ],
  "Anxiety Disorder": [
    { type: "education", name: "Weekly therapy session",        dayRange: "Day 1 – Day 180", summary: "CBT therapy · Once a week · 180 days · Mental health specialist",                     scheduledTime: "3:00 pm",  status: "upcoming", notes: "" },
    { type: "exercise",  name: "Daily mindfulness practice",    dayRange: "Day 1 – Day 180", summary: "Mindfulness · 10 min/day · Everyday · Morning",                                       scheduledTime: "7:30 am",  status: "upcoming", notes: "Use guided app or breathing exercises" },
    { type: "education", name: "Sleep hygiene protocol",        dayRange: "Day 1 – Day 180", summary: "Sleep hygiene · Daily routine · Fixed sleep/wake schedule",                           scheduledTime: "10:00 pm", status: "upcoming", notes: "No screens 1 hr before bed. Cool, dark room." },
  ],
  "Post-Op Recovery": [
    { type: "exercise",  name: "Physical therapy session",      dayRange: "Day 1 – Day 60",  summary: "PT session · 3x per week · 60 days · 45-min sessions",                                scheduledTime: "10:00 am", status: "upcoming", notes: "Track pain level before and after each session" },
    { type: "medicine",  name: "Pain management medication",    dayRange: "Day 1 – Day 30",  summary: "Pain management · As needed · 30 days · by mouth · per physician order",              scheduledTime: "8:00 am",  status: "upcoming", notes: "Do not exceed prescribed dose" },
    { type: "lab",       name: "CRP, CBC, Wound markers",       dayRange: "Day 7 – Day 60",  summary: "CRP, CBC · Once in 14 days · 60 days · infection and recovery markers",               scheduledTime: "9:00 am",  status: "upcoming", notes: "Check wound appearance at each draw" },
    { type: "education", name: "Fall prevention assessment",    dayRange: "Day 1 – Day 7",   summary: "Fall prevention · Once · OT team home safety assessment",                              scheduledTime: "2:00 pm",  status: "upcoming", notes: "" },
  ],
};

const CONDITION_LIST_TEXT = {
  "Type 2 Diabetes": "**Metformin 500mg** (daily, by mouth)\n**HbA1c + Fasting Glucose labs** (every 30 days)\n**Low-carb meal plan** (daily)\n**30-minute brisk walk** (daily)\n**Diabetes education program** (weekly, 30 days)",
  "Hypertension":    "**Amlodipine 5mg** (daily, by mouth)\n**Home BP monitoring** (twice daily)\n**DASH low-sodium diet** (daily)\n**BMP + Lipid Panel labs** (monthly from day 30)",
  "Heart Failure":   "**Daily weight monitoring** (every morning)\n**Furosemide 40mg** (daily, by mouth)\n**Fluid restriction 2L/day** (daily)\n**BNP + BMP + CBC labs** (monthly)\n**Cardiac rehab** (3x/week from day 30)",
  "Anxiety Disorder":"**Weekly therapy sessions** (CBT specialist)\n**Daily mindfulness** (10 min, every morning)\n**Sleep hygiene protocol** (daily evening routine)",
  "Post-Op Recovery":"**Physical therapy** (3x/week, 60 days)\n**Pain management medication** (as needed, 30 days)\n**CRP + CBC labs** (every 14 days from day 7)\n**Fall prevention assessment** (once, OT team)",
};

const DEFAULT_ACTIVITIES = {
  "Type 2 Diabetes": CONDITION_LIST_TEXT["Type 2 Diabetes"],
  "Hypertension":    CONDITION_LIST_TEXT["Hypertension"],
  "Heart Failure":   CONDITION_LIST_TEXT["Heart Failure"],
  "Anxiety Disorder":CONDITION_LIST_TEXT["Anxiety Disorder"],
  "Post-Op Recovery":CONDITION_LIST_TEXT["Post-Op Recovery"],
};

function getAIStepResponse(stage, userInput, ctx) {
  const condition = normalizeCondition(ctx.condition || userInput || "");

  if (stage === "welcome") {
    return {
      text: "Hi! I'm your care plan assistant. I'll help you build a reusable template.\n\nWhat condition or diagnosis is this care plan for?",
      nextStage: "condition",
    };
  }
  if (stage === "condition") {
    return {
      text: `Got it — **${condition}**. What's the typical age range for patients on this plan?\n\n_(e.g. 45–65 yrs, 60–80 yrs)_`,
      nextStage: "ageRange",
      extracted: { condition, templateName: `${condition} Care Plan` },
    };
  }
  if (stage === "ageRange") {
    return {
      text: `Thanks! And what's the primary gender for this template?\n\n_(Male / Female / Any)_`,
      nextStage: "gender",
      extracted: { ageRange: userInput.trim() },
    };
  }
  if (stage === "gender") {
    const actList = DEFAULT_ACTIVITIES[ctx.condition] || "a set of standard activities";
    return {
      text: `Perfect. Based on clinical guidelines for **${ctx.condition}** patients (${ctx.ageRange}, ${userInput.trim()}), I recommend:\n\n${actList}\n\nShall I add these activities to your template?`,
      nextStage: "suggest",
      extracted: { gender: userInput.trim() },
      suggestedActivities: CONDITION_ACTIVITIES[ctx.condition] || [],
    };
  }
  if (stage === "suggest") {
    const yes = /yes|add|ok|sure|go ahead|looks good|great/i.test(userInput);
    if (yes) {
      return {
        text: "I've added all the activities to your template. Review and customize them in the preview panel on the right.\n\nWould you like to add any specific notes or adjust an activity?",
        nextStage: "refine",
        action: "addActivities",
      };
    } else {
      return {
        text: "No problem! You can manually add activities using the **Add Activity** button in the preview panel. Feel free to ask me about any specific activity type or dosing guidelines.",
        nextStage: "refine",
      };
    }
  }
  return {
    text: "Your template is taking shape! Click **Save Template** when you're ready, or ask me to adjust anything.",
    nextStage: "refine",
  };
}

// ── Activity picker modal ────────────────────────────────────────────
function ActivityPickerModal({ onAdd, onClose }) {
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [dayRange, setDayRange] = useState("Day 1 – Day 90");
  const [frequency, setFrequency] = useState("Once a day");
  const [notes, setNotes] = useState("");

  function handleAdd() {
    if (!selected || !name.trim()) return;
    const cfg = ACTIVITY_TYPES.find(t => t.key === selected);
    onAdd({
      id: `act-${Date.now()}`,
      type: selected,
      name: name.trim(),
      dayRange,
      summary: `${name.trim()} · ${frequency} · ${dayRange}`,
      scheduledTime: "9:00 am",
      status: "upcoming",
      notes: notes.trim(),
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-cara-border w-full max-w-md">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-cara-border">
          <h3 className="text-sm font-bold text-cara-text">Add Activity</h3>
          <button onClick={onClose} className="text-cara-textMute hover:text-cara-text">
            <X size={16} />
          </button>
        </div>
        <div className="px-5 py-4 flex flex-col gap-4">

          {/* Type picker */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute mb-2">Activity Type</p>
            <div className="grid grid-cols-3 gap-2">
              {ACTIVITY_TYPES.map(t => {
                const IconComp = t.icon;
                return (
                  <button
                    key={t.key}
                    onClick={() => setSelected(t.key)}
                    className={clsx(
                      "flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all",
                      selected === t.key
                        ? "border-care-500 bg-care-50 text-care-700"
                        : "border-cara-border text-cara-textSub hover:border-care-300"
                    )}
                  >
                    <div className={clsx("w-7 h-7 rounded-lg flex items-center justify-center", t.color)}>
                      <IconComp size={13} />
                    </div>
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute block mb-1">
              Activity Name
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Metformin 500mg"
              className="w-full px-3 py-2 text-sm rounded-xl border border-cara-border focus:outline-none focus:border-care-400 bg-white text-cara-text placeholder:text-cara-textMute"
            />
          </div>

          {/* Day range + frequency */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute block mb-1">
                Day Range
              </label>
              <input
                value={dayRange}
                onChange={e => setDayRange(e.target.value)}
                placeholder="Day 1 – Day 90"
                className="w-full px-3 py-2 text-sm rounded-xl border border-cara-border focus:outline-none focus:border-care-400 bg-white text-cara-text placeholder:text-cara-textMute"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute block mb-1">
                Frequency
              </label>
              <select
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-cara-border focus:outline-none focus:border-care-400 bg-white text-cara-text"
              >
                <option>Once a day</option>
                <option>Twice a day</option>
                <option>Once a week</option>
                <option>Twice a week</option>
                <option>Once in 30 days</option>
                <option>3x per week</option>
                <option>As needed</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute block mb-1">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              placeholder="Special instructions..."
              className="w-full px-3 py-2 text-sm rounded-xl border border-cara-border focus:outline-none focus:border-care-400 bg-white text-cara-text placeholder:text-cara-textMute resize-none"
            />
          </div>
        </div>
        <div className="px-5 pb-5 flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm text-cara-textSub border border-cara-border rounded-xl hover:bg-cara-muted transition-colors">
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selected || !name.trim()}
            className="px-4 py-2 text-sm font-semibold bg-care-500 text-white rounded-xl hover:bg-care-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add Activity
          </button>
        </div>
      </div>
    </div>
  );
}

// ── AI Message bubble ────────────────────────────────────────────────
function renderMarkdown(text) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part.split("\n").map((line, j) => (
          <span key={`${i}-${j}`}>{line}{j < part.split("\n").length - 1 && <br />}</span>
        ))
  );
}

function Message({ role, text }) {
  return (
    <div className={clsx("flex gap-2", role === "user" ? "justify-end" : "justify-start")}>
      {role === "ai" && (
        <div className="w-7 h-7 rounded-xl bg-care-500 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles size={12} className="text-white" />
        </div>
      )}
      <div
        className={clsx(
          "px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed",
          role === "ai"
            ? "bg-white border border-cara-border text-cara-text rounded-tl-sm"
            : "bg-care-500 text-white rounded-tr-sm"
        )}
      >
        {role === "ai" ? renderMarkdown(text) : text}
      </div>
    </div>
  );
}

// ── Template activity row (editable) ────────────────────────────────
function TemplateActivityRow({ activity, onRemove }) {
  const cfg = ACTIVITY_TYPES.find(t => t.key === activity.type) || ACTIVITY_TYPES[0];
  const IconComp = cfg.icon;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-cara-border last:border-0">
      <div className={clsx("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5", cfg.color)}>
        <IconComp size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-cara-text">{activity.name}</p>
        <p className="text-[11px] text-cara-textMute mt-0.5">{activity.summary}</p>
        {activity.notes && (
          <p className="text-[10px] italic text-cara-textMute mt-1">{activity.notes}</p>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-[10px] text-cara-textMute bg-cara-muted px-2 py-0.5 rounded-full">
          {activity.dayRange}
        </span>
        <button onClick={() => onRemove(activity.id)} className="text-cara-textMute hover:text-gray-600 transition-colors">
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────
export function CreateCarePlanTemplate({ onBack, onSave }) {
  const [messages, setMessages] = useState([]);
  const [stage, setStage] = useState("welcome");
  const [input, setInput] = useState("");
  const [ctx, setCtx] = useState({ condition: "", ageRange: "", gender: "" });
  const [template, setTemplate] = useState({
    name: "",
    ageRange: "",
    gender: "",
    tags: [],
    activities: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Send the welcome message on mount
  useEffect(() => {
    const welcome = getAIStepResponse("welcome", "", {});
    setMessages([{ role: "ai", text: welcome.text }]);
    setStage(welcome.nextStage);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setInput("");

    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);

    // Get AI response
    const resp = getAIStepResponse(stage, text, ctx);

    // Update context
    const newCtx = { ...ctx, ...resp.extracted };
    setCtx(newCtx);

    // Update template fields
    const newTemplate = { ...template };
    if (resp.extracted?.templateName) newTemplate.name = resp.extracted.templateName;
    if (resp.extracted?.ageRange)     newTemplate.ageRange = resp.extracted.ageRange;
    if (resp.extracted?.gender)       newTemplate.gender = resp.extracted.gender;
    if (resp.extracted?.condition && !newTemplate.tags.includes(resp.extracted.condition)) {
      newTemplate.tags = [...newTemplate.tags, resp.extracted.condition];
    }
    if (resp.action === "addActivities" && resp.suggestedActivities) {
      newTemplate.activities = resp.suggestedActivities.map((a, i) => ({ ...a, id: `ai-${i}` }));
    }
    // if suggest stage, pass suggestedActivities forward in ctx
    const updCtx = resp.suggestedActivities
      ? { ...newCtx, suggestedActivities: resp.suggestedActivities }
      : { ...newCtx, suggestedActivities: ctx.suggestedActivities };

    setCtx(updCtx);
    setTemplate(newTemplate);
    setStage(resp.nextStage || stage);

    setTimeout(() => {
      // handle addActivities if from "suggest" stage accepted
      if (resp.action === "addActivities" && resp.suggestedActivities) {
        const acts = resp.suggestedActivities.map((a, i) => ({ ...a, id: `ai-${i}` }));
        setTemplate(prev => ({ ...prev, activities: acts }));
      }
      setMessages(prev => [...prev, { role: "ai", text: resp.text }]);
    }, 600);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Quick reply buttons for "suggest" stage
  const showQuickReplies = stage === "suggest";

  function addActivity(act) {
    setTemplate(prev => ({ ...prev, activities: [...prev.activities, act] }));
  }

  function removeActivity(id) {
    setTemplate(prev => ({ ...prev, activities: prev.activities.filter(a => a.id !== id) }));
  }

  function addTag(t) {
    const tag = t.trim();
    if (tag && !template.tags.includes(tag)) {
      setTemplate(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput("");
  }

  function removeTag(tag) {
    setTemplate(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-cara-surface border-b border-cara-border px-4 md:px-6 py-4 flex items-center justify-between flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-cara-textMute hover:text-cara-text transition-colors"
        >
          <ArrowLeft size={13} /> Back
        </button>
        <h1 className="text-sm font-bold text-cara-text">Create Care Plan Template</h1>
        <Button
          variant="care"
          size="sm"
          icon={Save}
          onClick={() => onSave?.(template)}
          disabled={!template.name}
        >
          Save Template
        </Button>
      </div>

      {/* Two-panel body */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT: AI Chat */}
        <div className="w-full md:w-[42%] flex flex-col border-r border-cara-border overflow-hidden">
          <div className="px-4 py-3 border-b border-cara-border bg-cara-muted/40 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-care-500 flex items-center justify-center">
              <Sparkles size={11} className="text-white" />
            </div>
            <span className="text-xs font-bold text-cara-textSub">AI Assistant</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-cara-muted/20">
            {messages.map((msg, i) => (
              <Message key={i} role={msg.role} text={msg.text} />
            ))}

            {/* Quick reply buttons */}
            {showQuickReplies && (
              <div className="flex gap-2 flex-wrap pl-9">
                {["Yes, add them all", "Let me customize"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setInput(opt); setTimeout(sendMessage, 0); }}
                    className="px-3 py-1.5 text-xs font-semibold border border-care-300 text-care-700 rounded-full hover:bg-care-50 transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-cara-border bg-white">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm rounded-xl border border-cara-border focus:outline-none focus:border-care-400 bg-white text-cara-text placeholder:text-cara-textMute"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-care-500 flex items-center justify-center text-white hover:bg-care-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Template Preview */}
        <div className="hidden md:flex flex-col flex-1 overflow-hidden">
          <div className="px-5 py-3 border-b border-cara-border bg-cara-muted/40 flex items-center justify-between">
            <span className="text-xs font-bold text-cara-textSub">Template Preview</span>
            <button
              onClick={() => setShowPicker(true)}
              className="flex items-center gap-1 text-xs font-semibold text-care-600 hover:text-care-700"
            >
              <Plus size={12} /> Add Activity
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {/* Template meta form */}
            <div className="bg-white border border-cara-border rounded-2xl p-5 mb-4">
              {/* Name */}
              <div className="mb-4">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute block mb-1">
                  Template Name
                </label>
                <input
                  value={template.name}
                  onChange={e => setTemplate(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Type 2 Diabetes Care Plan"
                  className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-cara-border focus:outline-none focus:border-care-400 bg-white text-cara-text placeholder:text-cara-textMute"
                />
              </div>

              {/* Age + Gender row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute flex items-center gap-1 mb-1">
                    <CalendarRange size={10} /> Age Range
                  </label>
                  <input
                    value={template.ageRange}
                    onChange={e => setTemplate(prev => ({ ...prev, ageRange: e.target.value }))}
                    placeholder="45 – 65 Yrs"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-cara-border focus:outline-none focus:border-care-400 bg-white text-cara-text placeholder:text-cara-textMute"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute flex items-center gap-1 mb-1">
                    <User size={10} /> Gender
                  </label>
                  <select
                    value={template.gender}
                    onChange={e => setTemplate(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-cara-border focus:outline-none focus:border-care-400 bg-white text-cara-text"
                  >
                    <option value="">Any</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Any</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-widest text-cara-textMute flex items-center gap-1 mb-1.5">
                  <Tag size={10} /> Tags / Conditions
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {template.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-care-50 text-care-700 border border-care-200">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-care-900">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(tagInput); } }}
                    placeholder="Add a tag and press Enter"
                    className="flex-1 px-3 py-1.5 text-sm rounded-xl border border-cara-border focus:outline-none focus:border-care-400 bg-white text-cara-text placeholder:text-cara-textMute"
                  />
                  <button
                    onClick={() => addTag(tagInput)}
                    className="px-3 py-1.5 text-xs font-semibold bg-care-50 text-care-700 border border-care-200 rounded-xl hover:bg-care-100 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Activities list */}
            <div className="bg-white border border-cara-border rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-cara-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-cara-textSub">Activities</span>
                  {template.activities.length > 0 && (
                    <span className="text-xs font-semibold text-white bg-care-500 px-1.5 py-0.5 rounded-full">
                      {template.activities.length}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowPicker(true)}
                  className="flex items-center gap-1 text-xs font-semibold text-care-600 hover:text-care-700 transition-colors"
                >
                  <Plus size={12} /> Add
                </button>
              </div>

              <div className="px-5">
                {template.activities.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-10 h-10 rounded-xl bg-cara-muted flex items-center justify-center mx-auto mb-3">
                      <Plus size={18} className="text-cara-textMute" />
                    </div>
                    <p className="text-sm text-cara-textMute">No activities yet.</p>
                    <p className="text-xs text-cara-textMute mt-1">
                      Tell the AI assistant what condition this plan is for, or add activities manually.
                    </p>
                  </div>
                ) : (
                  template.activities.map(a => (
                    <TemplateActivityRow key={a.id} activity={a} onRemove={removeActivity} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity picker modal */}
      {showPicker && (
        <ActivityPickerModal
          onAdd={addActivity}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
