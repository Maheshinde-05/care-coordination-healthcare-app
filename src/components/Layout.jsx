import { useState } from "react";
import { clsx } from "clsx";
import {
  LayoutDashboard, Users, CheckSquare, Bell, MessageSquare,
  Settings, Menu, X
} from "lucide-react";
import { ALERTS } from "../data/mockData";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",  icon: LayoutDashboard },
  { id: "patients",  label: "Patients",   icon: Users },
  { id: "tasks",     label: "My Tasks",   icon: CheckSquare, badge: 7 },
  { id: "alerts",    label: "Alerts",     icon: Bell,        badge: 4 },
  { id: "messages",  label: "Messages",   icon: MessageSquare, badge: 2 },
];
const NAV_BOTTOM = [{ id: "settings", label: "Settings", icon: Settings }];

function NavItem({ item, active, collapsed, onClick }) {
  return (
    <button
      onClick={() => onClick(item.id)}
      title={collapsed ? item.label : undefined}
      className={clsx(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 border",
        collapsed ? "justify-center" : "justify-start",
        active
          ? "bg-care-500 text-white border-care-600 shadow-sm"
          : "text-cara-textSub hover:bg-cara-muted hover:text-cara-text border-transparent"
      )}
    >
      <div className="relative flex-shrink-0">
        <item.icon size={17} strokeWidth={active ? 2.5 : 1.8} />
        {item.badge > 0 && !active && collapsed && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gray-700 text-white text-[8px] font-bold flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </div>
      {!collapsed && (
        <>
          <span className="flex-1 text-left tracking-tight">{item.label}</span>
          {item.badge > 0 && (
            <span className={clsx(
              "text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center",
              active ? "bg-white/25 text-white" : "bg-care-100 text-care-700"
            )}>
              {item.badge}
            </span>
          )}
        </>
      )}
    </button>
  );
}

export function CoordinatorLayout({ children, activeNav, onNavChange }) {
  const [collapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const unreadAlerts = ALERTS.filter(a => !a.acknowledged).length;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={clsx(
        "flex items-center gap-3 px-4 py-5 border-b border-cara-border",
        collapsed && "justify-center px-3"
      )}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #ECD06F, #F0722E, #2A9872)" }}
        >
          <span className="text-white font-black text-base tracking-tight">C</span>
        </div>
        {!collapsed && (
          <div>
            <div className="text-lg font-black tracking-[-0.04em] text-cara-text">CARA</div>
            <div className="text-[9px] font-semibold text-cara-textMute uppercase tracking-[0.12em]">Care Coordination</div>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="mx-3 mt-4 mb-1 bg-cara-muted border border-cara-border rounded-xl px-3 py-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-care-100 border border-care-200 flex items-center justify-center text-xs font-bold text-care-700 flex-shrink-0">
            SC
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-cara-text truncate tracking-tight">Sarah Chen, RN</div>
            <div className="text-[10px] text-cara-textMute">Care Coordinator</div>
          </div>
        </div>
      )}

      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5">
        {NAV_ITEMS.map(item => (
          <NavItem key={item.id} item={item} active={activeNav === item.id} collapsed={collapsed}
            onClick={(id) => { onNavChange(id); setMobileOpen(false); }}
          />
        ))}
      </nav>

      <div className="px-2 py-3 border-t border-cara-border flex flex-col gap-0.5">
        {NAV_BOTTOM.map(item => (
          <NavItem key={item.id} item={item} active={false} collapsed={collapsed} onClick={() => {}} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-cara-bg">
      <aside className={clsx(
        "hidden md:flex flex-col border-r border-cara-border bg-cara-surface transition-all duration-200",
        collapsed ? "w-14" : "w-56"
      )}>
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 w-64 h-full bg-cara-surface border-r border-cara-border">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-cara-muted text-cara-textMute">
              <X size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-cara-surface border-b border-cara-border">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg hover:bg-cara-muted text-cara-textSub">
            <Menu size={20} />
          </button>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#ECD06F,#F0722E,#2A9872)" }}
          >
            <span className="text-white font-black text-sm">C</span>
          </div>
          <span className="font-black text-sm tracking-tight text-cara-text">CARA</span>
          <div className="ml-auto relative">
            <button className="p-1.5 rounded-lg hover:bg-cara-muted text-cara-textSub"><Bell size={18} /></button>
            {unreadAlerts > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gray-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadAlerts}
              </span>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-hidden flex flex-col">{children}</main>
      </div>
    </div>
  );
}
