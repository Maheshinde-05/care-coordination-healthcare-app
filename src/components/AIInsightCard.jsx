import { clsx } from "clsx";
import { Sparkles, ThumbsUp, ThumbsDown, RefreshCw, ChevronRight } from "lucide-react";
import { useState } from "react";

export function AIInsightCard({ title, insights, onRefresh, compact = false }) {
  const [feedback, setFeedback] = useState(null);

  return (
    <div className="rounded-2xl border border-cara-border bg-white overflow-hidden">
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-care-500 flex items-center justify-center">
            <Sparkles size={13} className="text-white" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-cara-text">{title}</span>
          <span className="text-[10px] text-care-700 bg-care-50 px-1.5 py-0.5 rounded-full font-bold border border-care-100">AI</span>
        </div>
        <button onClick={onRefresh} className="p-1.5 rounded-lg hover:bg-cara-muted text-cara-textMute transition-colors">
          <RefreshCw size={12} />
        </button>
      </div>

      <div className="px-4 pb-3">
        <ul className="space-y-2">
          {insights.slice(0, compact ? 3 : insights.length).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-snug text-cara-textSub">
              <ChevronRight size={13} className="flex-shrink-0 mt-0.5 text-care-400" />
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      {!compact && (
        <div className="px-4 py-3 flex items-center gap-2 border-t border-cara-border">
          <span className="text-[11px] text-cara-textMute mr-auto font-medium">Was this helpful?</span>
          <button
            onClick={() => setFeedback("up")}
            className={clsx("p-1.5 rounded-lg transition-colors", feedback === "up" ? "bg-care-100 text-care-600" : "hover:bg-cara-muted text-cara-textMute")}
          >
            <ThumbsUp size={13} />
          </button>
          <button
            onClick={() => setFeedback("down")}
            className={clsx("p-1.5 rounded-lg transition-colors", feedback === "down" ? "bg-gray-200 text-gray-600" : "hover:bg-cara-muted text-cara-textMute")}
          >
            <ThumbsDown size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

export function DailyDigestCard({ digest }) {
  return (
    <div className="rounded-2xl p-5 border border-cara-border bg-white">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-care-50 border border-care-100 flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} className="text-care-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cara-textMute">Daily AI Digest</p>
            <p className="text-xs text-cara-textMute">{digest.date}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        {[
          { label: "Critical",  value: digest.critical  },
          { label: "Attention", value: digest.attention },
          { label: "Care Gaps", value: digest.careGaps  },
          { label: "Upcoming",  value: digest.upcoming  },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-cara-border px-3 py-2.5 text-center bg-cara-muted">
            <div className="text-2xl font-black leading-none text-cara-text">{value}</div>
            <div className="text-[10px] font-bold mt-1 uppercase tracking-wide text-cara-textMute">{label}</div>
          </div>
        ))}
      </div>

      <ul className="space-y-1.5">
        {digest.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-cara-textSub">
            <span className="w-1 h-1 rounded-full bg-care-400 flex-shrink-0 mt-2" />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}
