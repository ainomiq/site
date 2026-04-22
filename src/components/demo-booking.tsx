"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const DAYS = ["ma", "di", "wo", "do", "vr", "za", "zo"];
const MONTHS = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];

// Available time slots (09:00–16:30, 30-min intervals)
const ALL_SLOTS = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
];

// Slots that are grayed out / unavailable (for demo — in production these come from Google Calendar freebusy)
const UNAVAILABLE_SLOTS = ["11:00", "12:00", "12:30", "14:00", "14:30"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  // Monday-based (0=ma, 6=zo)
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function DemoBooking() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    question: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };
  const isWeekend = (day: number) => {
    const dow = new Date(viewYear, viewMonth, day).getDay();
    return dow === 0 || dow === 6;
  };
  const isSelected = (day: number) => {
    return (
      selectedDate?.getFullYear() === viewYear &&
      selectedDate?.getMonth() === viewMonth &&
      selectedDate?.getDate() === day
    );
  };
  const isToday = (day: number) => {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  function selectDay(day: number) {
    if (isPast(day) || isWeekend(day)) return;
    setSelectedDate(new Date(viewYear, viewMonth, day));
    setSelectedTime(null);
  }

  const canPrevMonth = useMemo(() => {
    return !(viewYear === today.getFullYear() && viewMonth === today.getMonth());
  }, [viewYear, viewMonth, today]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate.toISOString().split("T")[0],
          time: selectedTime,
          ...form,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <CheckCircle className="h-14 w-14 text-ainomiq-blue" />
        <h3 className="text-2xl font-bold text-ainomiq-text">Demo confirmed!</h3>
        <p className="text-ainomiq-text-muted max-w-sm">
          You&apos;ll receive a confirmation email with a Google Calendar invite shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left: Calendar + time slots */}
      <div className="space-y-5">
        {/* Calendar */}
        <div className="rounded-2xl border border-ainomiq-border bg-ainomiq-navy p-6">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={prevMonth}
              disabled={!canPrevMonth}
              className="p-1.5 rounded-lg hover:bg-ainomiq-navy-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-ainomiq-text-muted" />
            </button>
            <span className="text-sm font-semibold text-ainomiq-text capitalize">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-ainomiq-navy-light transition-colors">
              <ChevronRight className="h-4 w-4 text-ainomiq-text-muted" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs text-ainomiq-text-subtle font-medium py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const disabled = isPast(day) || isWeekend(day);
              const sel = isSelected(day);
              const tod = isToday(day);
              return (
                <button
                  key={day}
                  onClick={() => selectDay(day)}
                  disabled={disabled}
                  className={[
                    "mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                    disabled
                      ? "text-ainomiq-text-subtle cursor-not-allowed"
                      : sel
                      ? "bg-ainomiq-blue text-white"
                      : tod
                      ? "border border-ainomiq-blue text-ainomiq-blue hover:bg-ainomiq-blue/10"
                      : "text-ainomiq-text hover:bg-ainomiq-navy-light",
                  ].join(" ")}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        {selectedDate && (
          <div className="rounded-2xl border border-ainomiq-border bg-ainomiq-navy p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-ainomiq-blue" />
              <span className="text-sm font-semibold text-ainomiq-text">Available times</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {ALL_SLOTS.map(slot => {
                const unavail = UNAVAILABLE_SLOTS.includes(slot);
                const sel = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => !unavail && setSelectedTime(slot)}
                    disabled={unavail}
                    className={[
                      "rounded-lg py-2 text-sm font-medium transition-colors border",
                      unavail
                        ? "border-ainomiq-border text-ainomiq-text-subtle cursor-not-allowed opacity-40"
                        : sel
                        ? "border-ainomiq-blue bg-ainomiq-blue text-white"
                        : "border-ainomiq-border text-ainomiq-text hover:border-ainomiq-blue hover:text-ainomiq-blue",
                    ].join(" ")}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right: Contact form */}
      <div className="rounded-2xl border border-ainomiq-border bg-ainomiq-navy p-6">
        <h3 className="text-lg font-bold text-ainomiq-text mb-1">Your details</h3>
        <p className="text-sm text-ainomiq-text-muted mb-5">Fill in your info to confirm the demo</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ainomiq-text-muted">First name *</label>
              <Input
                value={form.firstName}
                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                placeholder="First name"
                required
                className="bg-ainomiq-navy-light border-ainomiq-border text-ainomiq-text placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ainomiq-text-muted">Last name *</label>
              <Input
                value={form.lastName}
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                placeholder="Last name"
                required
                className="bg-ainomiq-navy-light border-ainomiq-border text-ainomiq-text placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ainomiq-text-muted">Email address *</label>
            <Input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="name@company.com"
              required
              className="bg-ainomiq-navy-light border-ainomiq-border text-ainomiq-text placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ainomiq-text-muted">Phone number</label>
            <Input
              type="tel"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="+31 6 00000000"
              className="bg-ainomiq-navy-light border-ainomiq-border text-ainomiq-text placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ainomiq-text-muted">Company *</label>
            <Input
              value={form.company}
              onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
              placeholder="Company name"
              required
              className="bg-ainomiq-navy-light border-ainomiq-border text-ainomiq-text placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ainomiq-text-muted">Any specific questions? (optional)</label>
            <Textarea
              value={form.question}
              onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
              placeholder="Tell us what you want to know..."
              rows={3}
              className="bg-ainomiq-navy-light border-ainomiq-border text-ainomiq-text placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {!selectedDate || !selectedTime ? (
            <p className="text-xs text-ainomiq-text-subtle text-center py-2">
              Select a date and time on the left to continue
            </p>
          ) : (
            <div className="rounded-lg bg-ainomiq-blue/10 border border-ainomiq-blue/20 px-4 py-2.5 text-sm text-ainomiq-blue font-medium">
              {selectedDate.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })} at {selectedTime}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={loading || !selectedDate || !selectedTime}
            className="w-full rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white h-12 disabled:opacity-50"
          >
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Confirming...</> : "Confirm demo →"}
          </Button>

          <p className="text-xs text-ainomiq-text-subtle text-center">
            You&apos;ll receive a confirmation email with a Google Calendar invite.{" "}
            Your data is processed in accordance with our{" "}
            <a href="/privacy" className="underline hover:text-ainomiq-text-muted">privacy policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
