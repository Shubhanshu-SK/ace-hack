"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  Zap,
  TrendingUp,
  Info,
  CalendarDays,
  User,
} from "lucide-react";
import {
  rdAccount,
  TODAY,
  formatCurrency,
  formatDate,
  formatDateKey,
} from "@/lib/data/rd-account";

// ── Helpers ────────────────────────────────────────────────────────────────────
const missedSet = new Set(rdAccount.missedDays);

function getDayStatus(date: Date) {
  const key = formatDateKey(date);
  const startKey = formatDateKey(rdAccount.startDate);
  const todayKey = formatDateKey(TODAY);
  const endKey = formatDateKey(rdAccount.maturityDate);

  if (key < startKey || key > endKey) return "out-of-range";
  if (key > todayKey) return "upcoming";
  if (key === todayKey) return "due";
  if (missedSet.has(key)) return "missed";
  return "collected";
}

function calcStats() {
  let collected = 0;
  let missed = 0;
  const cursor = new Date(rdAccount.startDate);
  const todayKey = formatDateKey(TODAY);

  while (formatDateKey(cursor) < todayKey) {
    if (missedSet.has(formatDateKey(cursor))) missed++;
    else collected++;
    cursor.setDate(cursor.getDate() + 1);
  }

  // Current streak — consecutive collected days going back from yesterday
  let streak = 0;
  const s = new Date(TODAY);
  s.setDate(s.getDate() - 1);
  while (s >= rdAccount.startDate) {
    if (missedSet.has(formatDateKey(s))) break;
    streak++;
    s.setDate(s.getDate() - 1);
  }

  // Days remaining (today + future)
  const remaining = rdAccount.totalDays - collected - missed;

  return { collected, missed, streak, remaining };
}

// ── Day-cell color map ─────────────────────────────────────────────────────────
const cellStyle: Record<string, string> = {
  collected: "bg-[#732300] text-white shadow-sm",
  missed: "bg-red-100 text-red-600 ring-1 ring-red-300",
  due: "bg-amber-400 text-white shadow-md ring-2 ring-amber-300",
  upcoming: "bg-gray-50 text-gray-400",
  "out-of-range": "text-gray-200 pointer-events-none",
};

const statusLabel: Record<string, { text: string; cls: string }> = {
  collected: { text: "Jama", cls: "bg-green-100 text-green-700" },
  missed: { text: "Nahin Aaya", cls: "bg-red-100 text-red-600" },
  due: { text: "Aaj Due", cls: "bg-amber-100 text-amber-700" },
  upcoming: { text: "Baaki Hai", cls: "bg-gray-100 text-gray-500" },
};

// ── Component ──────────────────────────────────────────────────────────────────
export function MeriRDDaily() {
  const stats = calcStats();
  const [viewMonth, setViewMonth] = useState(
    new Date(TODAY.getFullYear(), TODAY.getMonth(), 1)
  );
  const [tooltip, setTooltip] = useState<{
    date: Date;
    status: string;
  } | null>(null);

  // Build calendar grid
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay(); // 0 = Sun
  const calCells: (Date | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1)
    ),
  ];

  // Recent 7-day activity (going back from TODAY)
  const recentActivity: { date: Date; status: string }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(TODAY);
    d.setDate(d.getDate() - i);
    if (d >= rdAccount.startDate) {
      recentActivity.push({ date: d, status: getDayStatus(d) });
    }
  }

  const canGoPrev =
    new Date(year, month - 1, 1) >=
    new Date(
      rdAccount.startDate.getFullYear(),
      rdAccount.startDate.getMonth(),
      1
    );
  const canGoNext =
    new Date(year, month + 1, 1) <=
    new Date(
      rdAccount.maturityDate.getFullYear(),
      rdAccount.maturityDate.getMonth(),
      1
    );

  const totalCollectedAmt = stats.collected * rdAccount.dailyAmount;
  const progressPct = Math.round(
    ((stats.collected + stats.missed) / rdAccount.totalDays) * 100
  );

  return (
    <div className="space-y-5">
      {/* ── Type Badge ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-[#732300] text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 font-sans">
          <Zap className="w-3.5 h-3.5" />
          Daily Collection RD
        </span>
        
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Daily Amount */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#732300]/10 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-[#732300]" />
          </div>
          <div>
            <p className="text-gray-500 text-xs">Roz ka Amount</p>
            <p className="text-gray-900 font-semibold text-lg font-sans">
              {formatCurrency(rdAccount.dailyAmount)}
            </p>
          </div>
        </div>

        {/* Days Collected */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-xs">Jama Din</p>
            <p className="text-gray-900 font-semibold text-lg font-sans">
              {stats.collected}
              <span className="text-gray-400 text-sm font-normal">
                {" "}
                / {rdAccount.totalDays}
              </span>
            </p>
          </div>
        </div>

        {/* Streak */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-gray-500 text-xs">Current Streak</p>
            <p className="text-gray-900 font-semibold text-lg font-sans">
              {stats.streak}
              <span className="text-gray-400 text-sm font-normal"> din</span>
            </p>
          </div>
        </div>

        {/* Total Collected */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <text
                x="12"
                y="16"
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
                stroke="none"
                fontWeight="700"
              >
                INR
              </text>
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Abhi Tak Jama</p>
            <p className="text-gray-900 font-semibold text-lg font-sans">
              {formatCurrency(totalCollectedAmt)}
            </p>
          </div>
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 text-sm font-medium font-sans">
            Overall Progress
          </span>
          <span className="text-[#732300] text-sm font-semibold">
            {progressPct}% poora
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-[#732300] to-[#a87762] h-2.5 rounded-full transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>{formatDate(rdAccount.startDate)} se shuru</span>
          <span>Maturity: {formatDate(rdAccount.maturityDate)}</span>
        </div>
      </div>

      {/* ── Main Row: Calendar + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2 font-sans">
              <CalendarDays className="w-4 h-4 text-[#732300]" />
              Collection Calendar
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  canGoPrev && setViewMonth(new Date(year, month - 1, 1))
                }
                disabled={!canGoPrev}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-sm font-semibold text-gray-700 w-32 text-center font-sans">
                {viewMonth.toLocaleString("en-IN", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={() =>
                  canGoNext && setViewMonth(new Date(year, month + 1, 1))
                }
                disabled={!canGoNext}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="text-center text-xs text-gray-400 font-medium pb-1 font-sans"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {calCells.map((date, idx) => {
              if (!date) return <div key={`empty-${idx}`} />;
              const status = getDayStatus(date);
              const isToday = formatDateKey(date) === formatDateKey(TODAY);
              return (
                <button
                  key={formatDateKey(date)}
                  onClick={() =>
                    status !== "out-of-range" &&
                    setTooltip(
                      tooltip?.date &&
                        formatDateKey(tooltip.date) === formatDateKey(date)
                        ? null
                        : { date, status }
                    )
                  }
                  className={`
                    aspect-square w-full rounded-lg flex items-center justify-center text-xs font-semibold
                    transition-all cursor-pointer relative font-sans
                    ${cellStyle[status] || "bg-gray-50 text-gray-400"}
                    ${isToday ? "ring-2 ring-amber-400 ring-offset-1" : ""}
                  `}
                  title={date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                >
                  {date.getDate()}
                  {status === "missed" && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tooltip for selected day */}
          {tooltip && (
            <div className="mt-3 bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${cellStyle[tooltip.status]}`}
              >
                {tooltip.date.getDate()}
              </div>
              <div>
                <p className="text-gray-700 text-sm font-semibold font-sans">
                  {tooltip.date.toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 inline-block ${statusLabel[tooltip.status]?.cls}`}
                >
                  {statusLabel[tooltip.status]?.text}
                </span>
                {tooltip.status !== "upcoming" &&
                  tooltip.status !== "out-of-range" && (
                    <span className="text-gray-500 text-xs ml-2">
                      {tooltip.status === "missed"
                        ? "0 jama"
                        : `${formatCurrency(rdAccount.dailyAmount)} jama`}
                    </span>
                  )}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
            {[
              { color: "bg-[#732300]", label: "Jama (Collected)" },
              {
                color: "bg-red-100 ring-1 ring-red-300",
                label: "Nahin Aaya (Missed)",
              },
              { color: "bg-amber-400", label: "Aaj Due Hai" },
              { color: "bg-gray-50", label: "Aane Wala" },
            ].map((l) => (
              <div
                key={l.label}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <div className={`w-3 h-3 rounded ${l.color}`} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Today card + Recent Activity */}
        <div className="flex flex-col gap-4">
          {/* Today's Status */}
          <div className="bg-gradient-to-br from-[#732300] to-[#a87762] rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-white/80" />
              <span className="text-sm font-semibold font-sans">
                Aaj —{" "}
                {TODAY.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="bg-white/20 rounded-lg p-3 mb-3">
              <p className="text-white/70 text-xs">Aaj Bharna Hai</p>
              <p className="text-2xl font-bold font-sans">
                {formatCurrency(rdAccount.dailyAmount)}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
              <Clock className="w-4 h-4 text-white/70 shrink-0" />
              <div>
                <p className="text-white/70 text-xs">Agent aayega</p>
                <p className="text-sm font-semibold">
                  {rdAccount.agent.collectionTime}
                </p>
              </div>
            </div>
            {stats.streak > 0 && (
              <div className="flex items-center gap-2 mt-3 bg-amber-400/30 rounded-lg p-2.5">
                <Flame className="w-4 h-4 text-amber-200" />
                <p className="text-amber-100 text-xs font-semibold">
                  {stats.streak} din ki streak! Badhiya chal rahe ho
                </p>
              </div>
            )}
          </div>

          {/* Missed Days Alert */}
          {stats.missed > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-semibold text-sm font-sans">
                  {stats.missed} Din Miss Hue
                </p>
                <p className="text-red-600 text-xs mt-0.5">
                  In dinon collection nahin hua. Agent se baat karo.
                </p>
              </div>
            </div>
          )}

          {/* Recent 7-Day Activity */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 font-sans">
              Pichle 7 Din
            </h3>
            <div className="space-y-2">
              {recentActivity.map(({ date, status }) => {
                const isToday = formatDateKey(date) === formatDateKey(TODAY);
                return (
                  <div
                    key={formatDateKey(date)}
                    className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${cellStyle[status]}`}
                      >
                        {date.getDate()}
                      </div>
                      <div>
                        <p className="text-gray-700 text-xs font-medium font-sans">
                          {isToday
                            ? "Aaj"
                            : date.toLocaleDateString("en-IN", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusLabel[status]?.cls}`}
                    >
                      {isToday ? "Due" : statusLabel[status]?.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Account Details + Agent Card ── */}
      <div className=" gap-5">
        {/* Account Details */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2 font-sans">
            <Info className="w-4 h-4 text-[#732300]" />
            Account ki Jaankari
          </h2>
          <div className="space-y-0">
            {[
              { label: "Account Number", value: rdAccount.accountNo },
              { label: "RD Type", value: "Daily Collection" },
              { label: "Bank", value: rdAccount.bank },
              { label: "Branch", value: rdAccount.branch },
              { label: "IFSC Code", value: rdAccount.ifsc },
              {
                label: "Roz ka Amount",
                value: formatCurrency(rdAccount.dailyAmount),
              },
              {
                label: "Interest Rate",
                value: `${rdAccount.interestRate}% p.a.`,
              },
              { label: "Shuruwat", value: formatDate(rdAccount.startDate) },
              { label: "Maturity", value: formatDate(rdAccount.maturityDate) },
              {
                label: "Maturity Amount",
                value: formatCurrency(rdAccount.maturityAmount),
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0"
              >
                <span className="text-gray-500 text-sm">{row.label}</span>
                <span className="text-gray-800 text-sm font-medium text-right">
                  {row.value}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2.5">
              <span className="text-gray-500 text-sm">Status</span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                {rdAccount.status}
              </span>
            </div>
          </div>
        </div>

        {/* Agent Card */}
        
      </div>
    </div>
  );
}
