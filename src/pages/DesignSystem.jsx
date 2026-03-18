import {
  Wallet, TrendingUp, Landmark, CreditCard, DollarSign, ChartPie,
  Bell, Settings, User, Calendar, Search, Plus, ArrowRight,
  Check, TriangleAlert, X, Info, ChevronDown, Menu, CheckCircle2,
} from "lucide-react";

/* ─── helpers ──────────────────────────────────────────────────────────── */
function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-qk-fg font-inter">{title}</h2>
        {subtitle && <p className="text-sm text-qk-muted-fg mt-0.5 font-inter">{subtitle}</p>}
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest text-qk-muted-fg font-inter mb-3">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="h-px bg-qk-border w-full my-2" />;
}

/* ─── 1. Token Library ──────────────────────────────────────────────────── */
function TokenSwatch({ label, hex, className }) {
  return (
    <div className="flex flex-col gap-1.5 flex-1 min-w-[80px]">
      <div className={`h-12 rounded-lg w-full ${className}`} />
      <p className="text-[11px] font-semibold text-qk-fg font-inter leading-tight">{label}</p>
      <p className="text-[10px] text-qk-muted-fg font-inter font-mono">{hex}</p>
    </div>
  );
}

function SpacingBox({ size, label, px }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-qk-primary rounded-sm" style={{ width: px, height: px }} />
      <p className="text-[10px] text-center text-qk-muted-fg font-inter whitespace-pre-line">{label}</p>
    </div>
  );
}

function RadiusBox({ label, radius }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 bg-qk-primary" style={{ borderRadius: radius }} />
      <p className="text-[10px] text-center text-qk-muted-fg font-inter whitespace-pre-line">{label}</p>
    </div>
  );
}

function TokenLibrary() {
  return (
    <section className="bg-qk-bg rounded-2xl p-10 flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-qk-fg font-inter">Quicken Design System</h1>
        <p className="text-base text-qk-muted-fg font-inter mt-1">Token Library — all variables ready to bind across components</p>
      </div>
      <Divider />

      <div>
        <Label>Color Tokens</Label>
        <div className="flex gap-3 flex-wrap">
          <TokenSwatch label="--qk-primary" hex="#4F46E5" className="bg-qk-primary" />
          <TokenSwatch label="--qk-secondary" hex="#60A5FA" className="bg-qk-secondary" />
          <TokenSwatch label="--qk-accent" hex="#86EFAC" className="bg-qk-accent" />
          <TokenSwatch label="--qk-success" hex="#22C55E" className="bg-qk-success" />
          <TokenSwatch label="--qk-warning" hex="#F59E0B" className="bg-qk-warning" />
          <TokenSwatch label="--qk-destructive" hex="#EF4444" className="bg-qk-destructive" />
          <TokenSwatch label="--qk-sidebar" hex="#1C1C2E" className="bg-qk-sidebar" />
          <TokenSwatch label="--qk-muted" hex="#F3F4F6" className="bg-qk-muted border border-qk-border" />
          <TokenSwatch label="--qk-border" hex="#E5E7EB" className="bg-qk-border border border-qk-border" />
        </div>
      </div>

      <div>
        <Label>Chart Tokens</Label>
        <div className="flex gap-3">
          <TokenSwatch label="--qk-chart-purple" hex="#6366F1" className="bg-qk-chart-purple" />
          <TokenSwatch label="--qk-chart-blue" hex="#3B82F6" className="bg-qk-chart-blue" />
          <TokenSwatch label="--qk-chart-green" hex="#4ADE80" className="bg-qk-chart-green" />
          <TokenSwatch label="--qk-chart-teal" hex="#2DD4BF" className="bg-qk-chart-teal" />
        </div>
      </div>

      <div>
        <Label>Spacing &amp; Radius Tokens</Label>
        <div className="flex items-end gap-8 flex-wrap">
          <SpacingBox label={"--qk-space-xs\n4px"} px={4} />
          <SpacingBox label={"--qk-space-sm\n8px"} px={8} />
          <SpacingBox label={"--qk-space-md\n16px"} px={16} />
          <SpacingBox label={"--qk-space-lg\n24px"} px={24} />
          <SpacingBox label={"--qk-space-xl\n32px"} px={32} />
          <SpacingBox label={"--qk-space-2xl\n48px"} px={48} />
          <div className="w-px h-12 bg-qk-border" />
          <RadiusBox label={"--radius-none\n0px"} radius="0px" />
          <RadiusBox label={"--radius-sm\n4px"} radius="4px" />
          <RadiusBox label={"--radius-m\n8px"} radius="8px" />
          <RadiusBox label={"--radius-lg\n12px"} radius="12px" />
          <RadiusBox label={"--radius-pill\n100px"} radius="100px" />
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Colors ─────────────────────────────────────────────────────────── */
function Colors() {
  const primaryRamp = [
    { stop: "50",  hex: "#EEF2FF", dark: false },
    { stop: "200", hex: "#C7D2FE", dark: false },
    { stop: "400", hex: "#818CF8", dark: true },
    { stop: "600 ★", hex: "#4F46E5", dark: true },
    { stop: "700", hex: "#4338CA", dark: true },
    { stop: "800", hex: "#3730A3", dark: true },
  ];
  const semantic = [
    // iconText: dark on bright bg (green #22C55E, amber #F59E0B fail WCAG with white)
    // iconText: white on dark bg  (red #EF4444 ~3.75:1 OK for UI, indigo #4F46E5 ~6.3:1 passes AA)
    { name: "Success",     token: "--qk-success · #22C55E",    bg: "bg-qk-success",     light: "bg-green-50",  text: "text-green-800",  iconText: "text-green-900",  Icon: Check },
    { name: "Warning",     token: "--qk-warning · #F59E0B",    bg: "bg-qk-warning",     light: "bg-amber-50",  text: "text-amber-800",  iconText: "text-amber-900",  Icon: TriangleAlert },
    { name: "Destructive", token: "--qk-destructive · #EF4444",bg: "bg-qk-destructive", light: "bg-red-50",    text: "text-red-800",    iconText: "text-white",      Icon: X },
    { name: "Info",        token: "--qk-primary · #4F46E5",    bg: "bg-qk-primary",     light: "bg-indigo-50", text: "text-indigo-800", iconText: "text-white",      Icon: Info },
  ];

  return (
    <section className="bg-qk-bg rounded-2xl p-10 flex flex-col gap-8">
      <SectionHeader title="Colors" subtitle="Core palette extracted from Quicken's UI system" />
      <Divider />

      <div>
        <Label>Primary — Brand Indigo</Label>
        <div className="flex rounded-xl overflow-hidden h-20">
          {primaryRamp.map((s) => (
            <div key={s.stop} className="flex-1 flex flex-col justify-end p-2.5" style={{ background: s.hex }}>
              <p className={`text-[11px] font-bold leading-tight ${s.dark ? "text-white" : "text-indigo-900"}`}>{s.stop}</p>
              <p className={`text-[10px] font-mono ${s.dark ? "text-indigo-200" : "text-indigo-700"}`}>{s.hex}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Semantic Colors</Label>
        <div className="grid grid-cols-4 gap-4">
          {semantic.map(({ name, token, bg, light, text, iconText, Icon }) => (
            <div key={name} className="rounded-xl overflow-hidden">
              <div className={`${bg} h-16 flex items-center justify-center`}>
                <Icon size={22} className={iconText} />
              </div>
              <div className={`${light} px-3.5 py-2.5`}>
                <p className={`text-xs font-semibold ${text}`}>{name}</p>
                <p className={`text-[10px] font-mono ${text} opacity-70`}>{token}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Typography ─────────────────────────────────────────────────────── */
function TypoRow({ label, spec, children }) {
  return (
    <div className="flex items-center gap-6 py-3 border-b border-qk-border last:border-0">
      <div className="w-36 flex-shrink-0">
        <p className="text-[11px] font-semibold text-qk-muted-fg font-inter">{label}</p>
        <p className="text-[10px] text-qk-muted-fg font-inter font-mono mt-0.5">{spec}</p>
      </div>
      <div className="w-px h-8 bg-qk-border flex-shrink-0" />
      {children}
    </div>
  );
}

function Typography() {
  return (
    <section className="bg-qk-bg rounded-2xl p-10 flex flex-col gap-6">
      <SectionHeader title="Typography" subtitle="Inter — scale, weight, and use" />
      <Divider />
      <Label>Type Scale</Label>
      <div>
        <TypoRow label="Display / H1" spec="40px · 700 · -0.5ls">
          <span className="text-[40px] font-bold text-qk-fg font-inter leading-none tracking-tight">$16,531.54</span>
        </TypoRow>
        <TypoRow label="Heading / H2" spec="28px · 700 · -0.25ls">
          <span className="text-[28px] font-bold text-qk-fg font-inter leading-none">Spending Plan</span>
        </TypoRow>
        <TypoRow label="Title / H3" spec="20px · 600">
          <span className="text-[20px] font-semibold text-qk-fg font-inter">Bills &amp; Payments</span>
        </TypoRow>
        <TypoRow label="Body" spec="16px · 400 · 1.5lh">
          <span className="text-base text-qk-fg font-inter leading-relaxed">Fancy Dinner Place — Bars — Feb 5</span>
        </TypoRow>
        <TypoRow label="Small" spec="14px · 400">
          <span className="text-sm text-qk-muted-fg font-inter">Uncategorized · from Friday - Today</span>
        </TypoRow>
        <TypoRow label="Caption" spec="11px · 400 · 1.4lh">
          <span className="text-[11px] tracking-widest text-qk-muted-fg font-inter uppercase">NET WORTH · AVAILABLE BALANCE</span>
        </TypoRow>
        <TypoRow label="Numeric / Amount" spec="32px · 700 · tabular">
          <span className="text-[32px] font-bold text-qk-success font-inter">+$1,000.00</span>
          <span className="text-[32px] font-bold text-qk-fg font-inter ml-6">$420.00</span>
        </TypoRow>
      </div>
    </section>
  );
}

/* ─── 4. Buttons ────────────────────────────────────────────────────────── */
function QkButton({ variant = "primary", size = "md", children, className = "" }) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold font-inter transition-all duration-150 cursor-pointer focus:outline-none";
  const variants = {
    primary:     "bg-qk-primary hover:bg-qk-primary-700 text-white shadow-sm",
    secondary:   "bg-qk-secondary hover:opacity-90 text-qk-fg shadow-sm",
    outline:     "bg-transparent border border-qk-border hover:bg-qk-muted text-qk-fg",
    ghost:       "bg-transparent hover:bg-qk-muted text-qk-muted-fg",
    destructive: "bg-qk-destructive hover:opacity-90 text-white shadow-sm",
  };
  const sizes = {
    sm: "px-3.5 py-1.5 text-xs rounded-lg",
    md: "px-4 py-2 text-sm rounded-[10px]",
    lg: "px-5 py-2.5 text-base rounded-xl",
  };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>{children}</button>;
}

function QkIconButton({ variant = "primary", Icon }) {
  const variants = {
    primary:     "bg-qk-primary hover:bg-qk-primary-700 text-white",
    secondary:   "bg-qk-secondary hover:opacity-90 text-qk-fg",
    outline:     "border border-qk-border hover:bg-qk-muted text-qk-fg",
    ghost:       "hover:bg-qk-muted text-qk-muted-fg",
    destructive: "bg-qk-destructive hover:opacity-90 text-white",
  };
  return (
    <button className={`w-9 h-9 rounded-[10px] flex items-center justify-center font-inter transition-all ${variants[variant]}`}>
      {Icon && <Icon size={16} />}
    </button>
  );
}

function Buttons() {
  return (
    <section className="bg-qk-bg rounded-2xl p-10 flex flex-col gap-8">
      <SectionHeader title="Buttons" subtitle="All variants, sizes, and states" />
      <Divider />

      <div>
        <Label>Variants</Label>
        <div className="flex items-center gap-3 flex-wrap">
          {["primary","secondary","outline","ghost","destructive"].map(v => (
            <QkButton key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</QkButton>
          ))}
        </div>
      </div>

      <div>
        <Label>Sizes</Label>
        <div className="flex items-center gap-3 flex-wrap">
          <QkButton size="sm">Small</QkButton>
          <QkButton size="md">Medium</QkButton>
          <QkButton size="lg">Large</QkButton>
          <QkButton size="sm" variant="outline">Small Outline</QkButton>
          <QkButton size="lg" variant="destructive">Large Destructive</QkButton>
        </div>
      </div>

      <div>
        <Label>With Icons</Label>
        <div className="flex items-center gap-3 flex-wrap">
          <QkButton variant="primary"><Plus size={14} /> Add Account</QkButton>
          <QkButton variant="outline"><Search size={14} /> Search</QkButton>
          <QkButton variant="secondary">Export <ArrowRight size={14} /></QkButton>
        </div>
      </div>

      <div>
        <Label>Icon Buttons</Label>
        <div className="flex items-center gap-3 flex-wrap">
          {["primary","secondary","outline","ghost","destructive"].map(v => (
            <QkIconButton key={v} variant={v} Icon={Plus} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Cards ──────────────────────────────────────────────────────────── */
const txData = [
  { name: "Fancy Dinner Place", cat: "Bars · Feb 5", amt: "$194.00", pos: false },
  { name: "Fancy Bar Out",      cat: "Uncategorized · Feb 5", amt: "+$15.00", pos: true },
  { name: "Potato Corner",      cat: "Dining · Feb 5", amt: "$44.70",  pos: false },
];

function Cards() {
  return (
    <section className="bg-qk-bg rounded-2xl p-10 flex flex-col gap-8">
      <SectionHeader title="Cards" subtitle="Surface containers for grouped content" />
      <Divider />
      <Label>Card Variants</Label>
      <div className="grid grid-cols-3 gap-5 items-start">

        {/* Metric Card */}
        <div className="bg-qk-card rounded-xl border border-qk-border">
          <div className="p-6 flex flex-col gap-1">
            <p className="text-sm text-qk-muted-fg font-inter">Net Worth</p>
            <p className="text-3xl font-bold text-qk-fg font-inter">$16,531.54</p>
            <p className="text-xs text-qk-success font-inter">+$1,200 this month</p>
          </div>
          <div className="h-px bg-qk-border" />
          <div className="px-6 py-3 flex justify-between items-center">
            <p className="text-xs text-qk-muted-fg font-inter">Updated just now</p>
            <TrendingUp size={14} className="text-qk-success" />
          </div>
        </div>

        {/* Transaction List Card */}
        <div className="bg-qk-card rounded-xl border border-qk-border">
          <div className="px-5 py-4 flex justify-between items-center">
            <p className="text-sm font-semibold text-qk-fg font-inter">Recent Transactions</p>
            <span className="text-xs text-qk-primary font-inter cursor-pointer">See all →</span>
          </div>
          <div className="h-px bg-qk-border" />
          {txData.map((tx) => (
            <div key={tx.name} className="flex justify-between items-center px-5 py-3.5 border-b border-qk-border last:border-0">
              <div>
                <p className="text-sm font-medium text-qk-fg font-inter">{tx.name}</p>
                <p className="text-xs text-qk-muted-fg font-inter">{tx.cat}</p>
              </div>
              <p className={`text-sm font-semibold font-inter ${tx.pos ? "text-qk-success" : "text-qk-fg"}`}>{tx.amt}</p>
            </div>
          ))}
        </div>

        {/* Sidebar Nav Card */}
        <div className="bg-qk-sidebar rounded-xl overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-qk-primary flex items-center justify-center flex-shrink-0">
              <DollarSign size={16} className="text-white" />
            </div>
            <p className="text-base font-bold text-white font-inter">Quicken</p>
          </div>
          <div className="h-px bg-white/10" />
          {[
            { icon: Menu, label: "Dashboard", active: true },
            { icon: ArrowRight, label: "Transactions", active: false },
            { icon: TrendingUp, label: "Investments", active: false },
            { icon: Wallet, label: "Accounts", active: false },
          ].map(({ icon: Icon, label, active }) => (
            <div key={label} className={`flex items-center gap-3 px-4 py-3 ${active ? "bg-qk-primary" : ""}`}>
              <Icon size={16} className={active ? "text-white" : "text-white/40"} />
              <p className={`text-sm font-inter ${active ? "text-white font-medium" : "text-white/40"}`}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Form Fields ────────────────────────────────────────────────────── */
function QkInput({ label, placeholder, filled }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold text-qk-muted-fg font-inter uppercase tracking-wide">{label}</label>}
      <input
        className={`w-full border border-qk-border rounded-lg px-3 py-2 text-sm text-qk-fg font-inter placeholder:text-qk-muted-fg outline-none focus:border-qk-primary focus:shadow-focus-qk transition-all ${filled ? "bg-qk-muted" : "bg-qk-card"}`}
        placeholder={placeholder}
        readOnly
      />
    </div>
  );
}

function QkSelect({ label }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold text-qk-muted-fg font-inter uppercase tracking-wide">{label}</label>}
      <div className="relative">
        <select className="w-full appearance-none border border-qk-border rounded-lg px-3 py-2 text-sm text-qk-fg bg-qk-card font-inter outline-none focus:border-qk-primary transition-all pr-8">
          <option>Select option</option>
          <option>Banking</option>
          <option>Investments</option>
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-qk-muted-fg pointer-events-none" />
      </div>
    </div>
  );
}

function FormFields() {
  return (
    <section className="bg-qk-bg rounded-2xl p-10 flex flex-col gap-8">
      <SectionHeader title="Form Fields" subtitle="Inputs, selects, toggles, and controls" />
      <Divider />

      <div>
        <Label>Inputs &amp; Selects</Label>
        <div className="grid grid-cols-4 gap-4">
          <QkInput label="Label Text" placeholder="Placeholder…" />
          <QkInput label="Filled" placeholder="Input Value" filled />
          <QkSelect label="Select" />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-qk-muted-fg font-inter uppercase tracking-wide">Search</label>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-qk-muted-fg" />
              <input className="w-full border border-qk-border rounded-lg pl-8 pr-3 py-2 text-sm text-qk-fg font-inter placeholder:text-qk-muted-fg bg-qk-card outline-none focus:border-qk-primary transition-all" placeholder="Search…" readOnly />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label>Checkboxes, Radios &amp; Switches</Label>
        <div className="flex items-center gap-8 flex-wrap">
          {/* Checkbox unchecked */}
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="w-4 h-4 rounded border-2 border-qk-border bg-qk-card" />
            <span className="text-sm text-qk-fg font-inter">Unchecked</span>
          </label>
          {/* Checkbox checked */}
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="w-4 h-4 rounded border-2 border-qk-primary bg-qk-primary flex items-center justify-center">
              <Check size={10} className="text-white" />
            </div>
            <span className="text-sm text-qk-fg font-inter">Checked</span>
          </label>
          {/* Radio unchecked */}
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="w-4 h-4 rounded-full border-2 border-qk-border bg-qk-card" />
            <span className="text-sm text-qk-fg font-inter">Radio</span>
          </label>
          {/* Radio selected */}
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="w-4 h-4 rounded-full border-2 border-qk-primary bg-qk-card flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-qk-primary" />
            </div>
            <span className="text-sm text-qk-fg font-inter">Selected</span>
          </label>
          {/* Switch off */}
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-5 rounded-full bg-qk-muted border border-qk-border relative">
              <div className="w-3.5 h-3.5 rounded-full bg-white shadow absolute top-0.5 left-0.5" />
            </div>
            <span className="text-sm text-qk-fg font-inter">Off</span>
          </label>
          {/* Switch on */}
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-5 rounded-full bg-qk-primary relative">
              <div className="w-3.5 h-3.5 rounded-full bg-white shadow absolute top-0.5 right-0.5" />
            </div>
            <span className="text-sm text-qk-fg font-inter">On</span>
          </label>
        </div>
      </div>

      <div>
        <Label>Textarea</Label>
        <textarea
          className="w-full border border-qk-border rounded-lg px-3 py-2.5 text-sm text-qk-fg font-inter placeholder:text-qk-muted-fg bg-qk-card outline-none focus:border-qk-primary transition-all resize-none h-24"
          placeholder="Type a note or description…"
          readOnly
        />
      </div>

      <div>
        <Label>Alerts</Label>
        <div className="flex flex-col gap-2">
          {[
            { icon: CheckCircle2, bg: "bg-green-50", border: "border-green-200", text: "text-green-800", title: "Mission approved", msg: "Your request to dispatch the rover has been confirmed." },
            { icon: TriangleAlert, bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", title: "Terrain difficulty detected", msg: "Proceed with caution or reroute to a safer path." },
            { icon: X, bg: "bg-red-50", border: "border-red-200", text: "text-red-800", title: "Communication link lost", msg: "Check your base antenna alignment or retry connection." },
            { icon: Info, bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-800", title: "Status update", msg: "All systems are running within optimal parameters." },
          ].map(({ icon: Icon, bg, border, text, title, msg }) => (
            <div key={title} className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${bg} ${border}`}>
              <Icon size={16} className={`${text} mt-0.5 flex-shrink-0`} />
              <div>
                <p className={`text-sm font-semibold ${text} font-inter`}>{title}</p>
                <p className={`text-xs ${text} font-inter opacity-80 mt-0.5`}>{msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 7. Icons ──────────────────────────────────────────────────────────── */
const ICONS = [
  { name: "wallet",       Icon: Wallet },
  { name: "trending-up",  Icon: TrendingUp },
  { name: "landmark",     Icon: Landmark },
  { name: "credit-card",  Icon: CreditCard },
  { name: "dollar-sign",  Icon: DollarSign },
  { name: "chart-pie",    Icon: ChartPie },
  { name: "bell",         Icon: Bell },
  { name: "settings",     Icon: Settings },
  { name: "user",         Icon: User },
  { name: "calendar",     Icon: Calendar },
  { name: "search",       Icon: Search },
  { name: "plus",         Icon: Plus },
  { name: "arrow-right",  Icon: ArrowRight },
];

function Icons() {
  return (
    <section className="bg-qk-bg rounded-2xl p-10 flex flex-col gap-8">
      <SectionHeader title="Icons" subtitle="Lucide icons — finance-focused set" />
      <Divider />
      <Label>24px · Lucide Outline</Label>
      <div className="flex flex-wrap gap-3">
        {ICONS.map(({ name, Icon }) => (
          <div key={name} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-qk-card border border-qk-border">
            <Icon size={24} className="text-qk-primary" />
            <p className="text-[10px] text-qk-muted-fg font-inter font-mono">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── 8. Layout ─────────────────────────────────────────────────────────── */
function Layout() {
  return (
    <section className="bg-qk-bg rounded-2xl p-10 flex flex-col gap-8">
      <SectionHeader title="Layout" subtitle="Grid, spacing, and scaffold patterns" />
      <Divider />

      {/* Pattern A: Sidebar + Content */}
      <div>
        <Label>Pattern A — Sidebar + Content (Dashboard)</Label>
        <div className="flex rounded-xl overflow-hidden border border-qk-border h-64">
          {/* Sidebar */}
          <div className="w-44 bg-qk-sidebar flex flex-col flex-shrink-0">
            <div className="flex items-center gap-2 px-4 py-3.5">
              <div className="w-6 h-6 rounded-md bg-qk-primary flex items-center justify-center flex-shrink-0">
                <DollarSign size={12} className="text-white" />
              </div>
              <p className="text-sm font-bold text-white font-inter">Quicken</p>
            </div>
            <div className="h-px bg-white/10" />
            {[{ icon: Menu, label: "Dashboard", active: true }, { icon: ArrowRight, label: "Transactions" }, { icon: TrendingUp, label: "Investments" }, { icon: Wallet, label: "Accounts" }].map(({ icon: Icon, label, active }) => (
              <div key={label} className={`flex items-center gap-2.5 px-4 py-2.5 ${active ? "bg-qk-primary" : ""}`}>
                <Icon size={14} className={active ? "text-white" : "text-white/40"} />
                <p className={`text-xs font-inter ${active ? "text-white font-medium" : "text-white/40"}`}>{label}</p>
              </div>
            ))}
          </div>
          {/* Main */}
          <div className="flex-1 bg-qk-bg p-4 flex flex-col gap-3">
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3">
              {[{ label: "Net Worth", val: "$16,531", color: "text-qk-fg" }, { label: "Available", val: "$6,788", color: "text-qk-success" }, { label: "Spent", val: "$679", color: "text-qk-destructive" }].map(({ label, val, color }) => (
                <div key={label} className="bg-qk-card rounded-lg border border-qk-border p-3">
                  <p className="text-[10px] text-qk-muted-fg font-inter">{label}</p>
                  <p className={`text-base font-bold font-inter ${color}`}>{val}</p>
                </div>
              ))}
            </div>
            {/* Content row */}
            <div className="flex gap-3 flex-1">
              <div className="flex-1 bg-qk-card rounded-lg border border-qk-border p-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-semibold text-qk-fg font-inter">Transactions</p>
                  <p className="text-[10px] text-qk-primary font-inter">See all</p>
                </div>
              </div>
              <div className="w-36 bg-qk-card rounded-lg border border-qk-border p-3">
                <p className="text-xs font-semibold text-qk-fg font-inter mb-2">Bills &amp; Payments</p>
                {[{ n: "Fitness First", v: "+$71" }, { n: "Income", v: "+$1,000" }].map(({ n, v }) => (
                  <div key={n} className="flex justify-between items-center py-1">
                    <p className="text-[10px] text-qk-fg font-inter">{n}</p>
                    <p className="text-[10px] font-semibold text-qk-success font-inter">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern B: Card Grid */}
      <div>
        <Label>Pattern B — Card Grid (3 Columns)</Label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Wallet,     label: "Banking",     val: "$9,681.49",  iconBg: "bg-indigo-50", iconColor: "text-qk-primary" },
            { icon: TrendingUp, label: "Investments", val: "$5,850.05",  iconBg: "bg-green-50",  iconColor: "text-qk-success" },
            { icon: Landmark,   label: "Assets",      val: "$1,000.00",  iconBg: "bg-amber-50",  iconColor: "text-qk-warning" },
          ].map(({ icon: Icon, label, val, iconBg, iconColor }) => (
            <div key={label} className="bg-qk-card rounded-xl border border-qk-border p-5 flex flex-col gap-3">
              <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center`}>
                <Icon size={18} className={iconColor} />
              </div>
              <p className="text-sm text-qk-muted-fg font-inter">{label}</p>
              <p className="text-2xl font-bold text-qk-fg font-inter">{val}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Nav ───────────────────────────────────────────────────────────────── */
const SECTIONS = ["Tokens", "Colors", "Typography", "Buttons", "Cards", "Form Fields", "Icons", "Layout"];

/* ─── Page ──────────────────────────────────────────────────────────────── */
export function DesignSystem() {
  return (
    <div className="min-h-screen bg-[#EEEEF5] font-inter">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-qk-sidebar border-b border-white/10 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-qk-primary flex items-center justify-center">
            <DollarSign size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white font-inter leading-tight">Quicken Design System</p>
            <p className="text-[10px] text-white/50 font-inter">v1.0 — Minimal Viable</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {SECTIONS.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase().replace(" ", "-")}`}
              className="px-3 py-1.5 text-xs text-white/60 hover:text-white hover:bg-white/10 rounded-lg font-inter transition-all"
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col gap-6">
        <div id="tokens"><TokenLibrary /></div>
        <div id="colors"><Colors /></div>
        <div id="typography"><Typography /></div>
        <div id="buttons"><Buttons /></div>
        <div id="cards"><Cards /></div>
        <div id="form-fields"><FormFields /></div>
        <div id="icons"><Icons /></div>
        <div id="layout"><Layout /></div>
      </div>
    </div>
  );
}
