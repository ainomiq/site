"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { spring, interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence } from "remotion";

const Player = dynamic(() => import("@remotion/player").then(m => m.Player), { ssr: false });

// ── Data ──────────────────────────────────────────────────────────────────────

// Before Ainomiq: chaotic/declining — spikes down, noisy
const BEFORE_DATA = [62, 48, 71, 38, 55, 29, 61, 34, 42, 22, 51, 27, 38, 18, 44, 21, 35, 16];
// After Ainomiq: consistent growth
const AFTER_DATA  = [22, 28, 34, 40, 45, 52, 58, 65, 71, 78, 85, 91, 96, 100];

// ── Chart helpers ─────────────────────────────────────────────────────────────

function buildPath(data: number[], innerW: number, innerH: number, pad: number) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * innerW,
    y: pad + innerH - ((v - min) / range) * innerH,
  }));
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return { d, pts, len };
}

function dotAt(pts: { x: number; y: number }[], progress: number, totalLen: number) {
  const target = totalLen * progress;
  let traveled = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    const seg = Math.sqrt(dx * dx + dy * dy);
    if (traveled + seg >= target) {
      const t = (target - traveled) / seg;
      return { x: pts[i - 1].x + dx * t, y: pts[i - 1].y + dy * t };
    }
    traveled += seg;
  }
  return pts[pts.length - 1];
}

// ── Remotion scene ────────────────────────────────────────────────────────────

const W = 900, H = 380, PAD = 48;

// Phase timings (in frames @ 30fps)
const BEFORE_START   = 0;
const BEFORE_DUR     = 90;   // chaos line draws for 3s
const HOLD_DUR       = 20;   // brief pause before activation
const LABEL_FRAME    = BEFORE_DUR + HOLD_DUR;   // when "Ainomiq Activated" appears
const AFTER_START    = LABEL_FRAME + 15;         // growth line starts drawing
const AFTER_DUR      = 90;   // growth line draws for 3s
const TOTAL          = AFTER_START + AFTER_DUR + 30;

function GrowthScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const IW = W - PAD * 2, IH = H - PAD * 2;

  const before = buildPath(BEFORE_DATA, IW, IH, PAD);
  const after  = buildPath(AFTER_DATA,  IW, IH, PAD);

  // Before progress
  const beforeProgress = spring({
    frame: frame - BEFORE_START,
    fps,
    durationInFrames: BEFORE_DUR,
    config: { damping: 200 },
  });

  // After progress
  const afterProgress = spring({
    frame: Math.max(0, frame - AFTER_START),
    fps,
    durationInFrames: AFTER_DUR,
    config: { damping: 200 },
  });

  // Label fade-in
  const labelOpacity = interpolate(frame, [LABEL_FRAME, LABEL_FRAME + 12], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Divider line x position (slides from left)
  const dividerProgress = interpolate(frame, [LABEL_FRAME - 5, LABEL_FRAME + 10], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Split x: where before ends / after begins
  // Before line ends at last before point, after line starts where before data ends
  // We place the split at 55% of inner width so before is wider (more chaos), after is compressed
  const splitX = PAD + IW * 0.55;

  // After line: offset it to start at splitX
  const afterOffsetX = splitX - PAD; // shift right by this amount
  const afterPts = after.pts.map(p => ({ x: p.x + afterOffsetX, y: p.y }));
  const afterD = afterPts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  const beforeDot = dotAt(before.pts, beforeProgress, before.len);
  const afterDot  = dotAt(afterPts, afterProgress, after.len);

  return (
    <AbsoluteFill style={{ background: "#0a0f1e", fontFamily: "system-ui, sans-serif" }}>
      {/* Subtle grid */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>

        {/* Grid lines */}
        {[0,1,2,3,4].map(i => {
          const y = PAD + (i / 4) * IH;
          return <line key={i} x1={PAD} x2={PAD+IW} y1={y} y2={y} stroke="#1e2a3a" strokeWidth={1} />;
        })}

        {/* Before line — red/chaotic */}
        <path
          d={before.d}
          fill="none"
          stroke="#ef4444"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={before.len}
          strokeDashoffset={before.len * (1 - beforeProgress)}
          style={{ filter: "drop-shadow(0 0 8px #ef444466)" }}
        />
        {beforeProgress > 0.05 && beforeProgress < 0.98 && (
          <circle cx={beforeDot.x} cy={beforeDot.y} r={6} fill="#ef4444"
            style={{ filter: "drop-shadow(0 0 6px #ef4444)" }} />
        )}

        {/* Divider — vertical dashed line at split */}
        {dividerProgress > 0.01 && (
          <line
            x1={splitX} x2={splitX}
            y1={PAD} y2={PAD + IH * dividerProgress}
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="6 4"
            style={{ filter: "drop-shadow(0 0 6px #3b82f6)" }}
          />
        )}

        {/* After line — blue/green growth */}
        {frame >= AFTER_START && (
          <path
            d={afterD}
            fill="none"
            stroke="#22c55e"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={after.len}
            strokeDashoffset={after.len * (1 - afterProgress)}
            style={{ filter: "drop-shadow(0 0 10px #22c55e66)" }}
          />
        )}
        {frame >= AFTER_START && afterProgress > 0.02 && afterProgress < 0.99 && (
          <circle cx={afterDot.x} cy={afterDot.y} r={6} fill="#22c55e"
            style={{ filter: "drop-shadow(0 0 8px #22c55e)" }} />
        )}

        {/* Baseline axis */}
        <line x1={PAD} x2={PAD+IW} y1={PAD+IH} y2={PAD+IH} stroke="#1e2a3a" strokeWidth={2} />
      </svg>

      {/* "Ainomiq Activated" label */}
      {labelOpacity > 0.01 && (
        <div style={{
          position: "absolute",
          left: "50%", top: "12%",
          transform: "translateX(-50%)",
          opacity: labelOpacity,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: 100, padding: "6px 16px",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6",
              boxShadow: "0 0 8px #3b82f6" }} />
            <span style={{ color: "#93c5fd", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em" }}>
              AINOMIQ ACTIVATED
            </span>
          </div>
        </div>
      )}

      {/* Before / After labels */}
      <div style={{
        position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 32, alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: Math.min(1, beforeProgress * 3) }}>
          <div style={{ width: 24, height: 3, background: "#ef4444", borderRadius: 2 }} />
          <span style={{ color: "#9ca3af", fontSize: 12 }}>Before</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: Math.min(1, afterProgress * 3) }}>
          <div style={{ width: 24, height: 3, background: "#22c55e", borderRadius: 2 }} />
          <span style={{ color: "#9ca3af", fontSize: 12 }}>With Ainomiq</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────

export function GrowthChartSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#0a0f1e]">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            What consistent automation looks like.
          </h2>
          <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
            Erratic performance before. Steady growth after.
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ width: "100%", aspectRatio: "16/7", boxShadow: "0 0 60px rgba(34,197,94,0.08)" }}
        >
          <Player
            component={GrowthScene}
            durationInFrames={TOTAL}
            compositionWidth={W}
            compositionHeight={H}
            fps={30}
            controls={false}
            autoPlay
            loop
            clickToPlay={false}
            acknowledgeRemotionLicense
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}
