'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, ReferenceLine
} from 'recharts';
import { Shield, Users, AlertTriangle, Clock, Star, ChevronDown } from 'lucide-react';

// ─── Mock data ────────────────────────────────────────────────────────────────

const incidentsBySite = [
  { site: 'Schiphol', incidents: 12 },
  { site: 'Rotterdam', incidents: 9 },
  { site: 'Tilburg', incidents: 6 },
  { site: 'Amsterdam', incidents: 6 },
  { site: 'Den Haag', incidents: 5 },
  { site: 'ASML', incidents: 3 },
  { site: 'Utrecht', incidents: 2 },
  { site: 'Groningen', incidents: 1 },
];

const incidentsTrend = [
  { day: 'Ma 14', incidents: 52 },
  { day: 'Di 15', incidents: 48 },
  { day: 'Wo 16', incidents: 45 },
  { day: 'Do 17', incidents: 41 },
  { day: 'Vr 18', incidents: 43 },
  { day: 'Za 19', incidents: 39 },
  { day: 'Zo 20', incidents: 38 },
];

const aiActionTypes = [
  { name: 'Incident reporting', value: 35 },
  { name: 'Schedule optimization', value: 25 },
  { name: 'Client status updates', value: 20 },
  { name: 'Compliance checks', value: 12 },
  { name: 'Escalations', value: 8 },
];

const PIE_COLORS = ['#00d4aa', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

const responseTimeTrend = Array.from({ length: 30 }, (_, i) => {
  const aiActivated = 12;
  const base = i < aiActivated ? 6.8 - (i * 0.1) : 5.2 - ((i - aiActivated) * 0.1);
  return {
    day: i + 1,
    responseTime: Math.max(2.3, parseFloat(base.toFixed(1))),
    aiActive: i >= aiActivated,
  };
});

const sitePerformance = [
  { site: 'Schiphol Airport', guards: 45, incidents: 12, aiRate: 94, sla: 100, status: 'Excellent', statusColor: '#00d4aa' },
  { site: 'Rotterdam Port', guards: 38, incidents: 9, aiRate: 91, sla: 98, status: 'Good', statusColor: '#00d4aa' },
  { site: 'ASML Eindhoven', guards: 28, incidents: 3, aiRate: 97, sla: 100, status: 'Excellent', statusColor: '#00d4aa' },
  { site: 'Den Haag Ministerie', guards: 22, incidents: 5, aiRate: 89, sla: 96, status: 'Good', statusColor: '#f59e0b' },
  { site: 'Utrecht Science Park', guards: 18, incidents: 2, aiRate: 95, sla: 100, status: 'Excellent', statusColor: '#00d4aa' },
  { site: 'Amsterdam HQ ING', guards: 35, incidents: 6, aiRate: 90, sla: 97, status: 'Good', statusColor: '#00d4aa' },
  { site: 'Groningen Gasunie', guards: 20, incidents: 1, aiRate: 98, sla: 100, status: 'Excellent', statusColor: '#00d4aa' },
  { site: 'Tilburg Logistiek', guards: 34, incidents: 0, aiRate: 100, sla: 100, status: 'Excellent', statusColor: '#00d4aa' },
];

const activityFeed = [
  { id: 1, text: 'Schiphol - Unauthorized access attempt detected - Guard dispatched in 1.8min - Incident filed automatically', icon: '✓', warning: false },
  { id: 2, text: 'Rotterdam Port - Shift handover report generated automatically for 8 guards', icon: '✓', warning: false },
  { id: 3, text: 'ASML Eindhoven - Compliance check completed - All 28 guards certified', icon: '✓', warning: false },
  { id: 4, text: 'Den Haag Ministerie - Client requested status update - Auto-report sent in 12sec', icon: '✓', warning: false },
  { id: 5, text: 'Utrecht - Guard called in sick - AI found replacement, schedule updated', icon: '✓', warning: false },
  { id: 6, text: 'Amsterdam ING - Perimeter alarm triggered - Verified false positive - Client notified', icon: '✓', warning: false },
  { id: 7, text: 'Groningen Gasunie - Monthly performance report generated - Sent to client', icon: '✓', warning: false },
  { id: 8, text: 'Tilburg - Visitor registration logged for 142 people', icon: '✓', warning: false },
  { id: 9, text: 'Schiphol - Suspicious behavior reported - Incident escalated to supervisor', icon: '⚠', warning: true },
  { id: 10, text: 'Rotterdam - Guard patrol route optimized by AI - 23% more coverage', icon: '✓', warning: false },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const CARD = { background: '#161d27', border: '1px solid #1e2836', borderRadius: 12 };

function KpiCard({ icon, label, value, sub, accent = '#00d4aa' }: {
  icon: React.ReactNode; label: string; value: string; sub: string; accent?: string;
}) {
  return (
    <div style={CARD} className="p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>
        <span style={{ color: accent }}>{icon}</span>
        {label}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs" style={{ color: '#6b7280' }}>{sub}</div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#161d27', border: '1px solid #1e2836', borderRadius: 8, padding: '8px 12px' }}>
      <p style={{ color: '#9ca3af', fontSize: 12 }}>{label}</p>
      <p style={{ color: '#00d4aa', fontWeight: 700 }}>{payload[0].value}</p>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

export function FacilityDashboard() {
  const [selectedSite, setSelectedSite] = useState('All sites');
  const [selectedShift, setSelectedShift] = useState('All');
  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFeedIndex((i) => (i + 1) % activityFeed.length), 3000);
    return () => clearInterval(t);
  }, []);

  const visibleFeed = [
    activityFeed[feedIndex % activityFeed.length],
    activityFeed[(feedIndex + 1) % activityFeed.length],
    activityFeed[(feedIndex + 2) % activityFeed.length],
    activityFeed[(feedIndex + 3) % activityFeed.length],
    activityFeed[(feedIndex + 4) % activityFeed.length],
  ];

  return (
    <div style={{ background: '#0f1923', fontFamily: 'inherit', borderRadius: 16, padding: 24, color: 'white' }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div style={{ background: 'linear-gradient(135deg, #00d4aa22, #3b82f622)', border: '1px solid #00d4aa44', borderRadius: 10, padding: 8 }}>
            <Shield size={22} color="#00d4aa" />
          </div>
          <div>
            <div className="font-bold text-xl text-white">SecureNL</div>
            <div className="text-xs" style={{ color: '#6b7280' }}>Security Operations Dashboard</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Site selector */}
          <div className="relative">
            <select
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              className="appearance-none pr-8 pl-3 py-1.5 text-sm rounded-lg"
              style={{ background: '#161d27', border: '1px solid #1e2836', color: 'white', cursor: 'pointer' }}
            >
              <option>All sites</option>
              {sitePerformance.map((s) => <option key={s.site}>{s.site}</option>)}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
          </div>

          {/* Shift selector */}
          <div className="relative">
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="appearance-none pr-8 pl-3 py-1.5 text-sm rounded-lg"
              style={{ background: '#161d27', border: '1px solid #1e2836', color: 'white', cursor: 'pointer' }}
            >
              <option value="All">All shifts</option>
              <option value="Day">Day Shift</option>
              <option value="Night">Night Shift</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
          </div>

          {/* AI status badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: '#00d4aa15', border: '1px solid #00d4aa33' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#00d4aa' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#00d4aa' }} />
            </span>
            <span className="text-xs font-semibold" style={{ color: '#00d4aa' }}>AI Active - 1,247 automated actions today</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          icon={<Users size={14} />}
          label="Guards deployed"
          value="240 / 240"
          sub="100% coverage - all sites staffed"
          accent="#00d4aa"
        />
        <KpiCard
          icon={<AlertTriangle size={14} />}
          label="AI incidents handled"
          value="38 today"
          sub="92% auto-resolved - 3 escalated"
          accent="#3b82f6"
        />
        <KpiCard
          icon={<Clock size={14} />}
          label="Avg response time"
          value="2.3 min"
          sub="SLA: under 5 min - on target"
          accent="#00d4aa"
        />
        <KpiCard
          icon={<Star size={14} />}
          label="Client satisfaction"
          value="4.9 / 5"
          sub="12 sites - 0 complaints this month"
          accent="#8b5cf6"
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Incident volume per site */}
        <div style={CARD} className="p-5">
          <div className="text-sm font-semibold text-white mb-4">Incident volume per site</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={incidentsBySite} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" vertical={false} />
              <XAxis dataKey="site" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="incidents" fill="#00d4aa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Incidents over time */}
        <div style={CARD} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-white">Incidents - last 7 days</div>
            <div className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#00d4aa15', color: '#00d4aa' }}>
              Trend: -27% vs last week
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={incidentsTrend}>
              <defs>
                <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d4aa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} domain={[30, 60]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="incidents" stroke="#00d4aa" strokeWidth={2} fill="url(#incGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* AI action types donut */}
        <div style={CARD} className="p-5">
          <div className="text-sm font-semibold text-white mb-4">AI action breakdown</div>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={aiActionTypes} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3} strokeWidth={0}>
                  {aiActionTypes.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: '#161d27', border: '1px solid #1e2836', borderRadius: 8 }} itemStyle={{ color: '#e5e7eb' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 flex-1">
              {aiActionTypes.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-xs flex-1" style={{ color: '#9ca3af' }}>{d.name}</span>
                  <span className="text-xs font-semibold text-white">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Response time trend */}
        <div style={CARD} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-white">Response time trend (30 days)</div>
            <div className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#00d4aa15', color: '#00d4aa' }}>
              6.8 min - 2.3 min
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={responseTimeTrend}>
              <defs>
                <linearGradient id="rtGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="40%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#00d4aa" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => v % 5 === 0 ? `D${v}` : ''} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} domain={[1, 8]} tickFormatter={(v) => `${v}m`} />
              <Tooltip
                formatter={(v: any) => [`${v} min`, 'Response time']}
                contentStyle={{ background: '#161d27', border: '1px solid #1e2836', borderRadius: 8 }}
                itemStyle={{ color: '#e5e7eb' }}
                labelFormatter={(l) => `Day ${l}`}
              />
              <ReferenceLine x={12} stroke="#00d4aa" strokeDasharray="4 4" label={{ value: 'AI activated', fill: '#00d4aa', fontSize: 10, position: 'insideTopRight' }} />
              <Line type="monotone" dataKey="responseTime" stroke="#00d4aa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Site performance table */}
      <div style={CARD} className="p-5 mb-4">
        <div className="text-sm font-semibold text-white mb-4">Site performance overview</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #1e2836' }}>
                {['Site', 'Guards', 'Incidents today', 'AI rate', 'SLA compliance', 'Status'].map((h) => (
                  <th key={h} className="text-left pb-3 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sitePerformance.map((row, i) => (
                <tr key={row.site} style={{ borderBottom: i < sitePerformance.length - 1 ? '1px solid #1e283650' : 'none' }}>
                  <td className="py-3 pr-4 text-white font-medium">{row.site}</td>
                  <td className="py-3 pr-4" style={{ color: '#9ca3af' }}>{row.guards}</td>
                  <td className="py-3 pr-4" style={{ color: row.incidents === 0 ? '#6b7280' : '#e5e7eb' }}>{row.incidents}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full" style={{ background: '#1e2836' }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${row.aiRate}%`, background: '#00d4aa' }} />
                      </div>
                      <span style={{ color: '#9ca3af' }}>{row.aiRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4" style={{ color: row.sla === 100 ? '#00d4aa' : '#f59e0b' }}>{row.sla}%</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: `${row.statusColor}20`, color: row.statusColor }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Activity Feed */}
      <div style={CARD} className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-white">AI activity feed</div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#00d4aa' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#00d4aa' }} />
            </span>
            <span className="text-xs" style={{ color: '#6b7280' }}>Live</span>
          </div>
        </div>
        <div className="space-y-2 overflow-hidden" style={{ height: 180 }}>
          <AnimatePresence mode="popLayout">
            {visibleFeed.map((item) => (
              <motion.div
                key={item.id + '-' + feedIndex}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-3 px-3 py-2 rounded-lg"
                style={{ background: '#0f1923' }}
              >
                <span className="mt-0.5 text-sm" style={{ color: item.warning ? '#f59e0b' : '#00d4aa' }}>
                  {item.icon}
                </span>
                <span className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>{item.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
