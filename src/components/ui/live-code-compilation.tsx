"use client";

import { useCurrentFrame } from "remotion";

export interface LiveCodeCompilationProps {
  accentColor?: string;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";
const MONO_FAMILY =
  "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

interface UIState {
  background?: string;
  color?: string;
  padding?: string;
  borderRadius?: string;
  fontWeight?: number;
  label?: string;
}

interface CodeEvent {
  code: string;
  ui: UIState;
}

const EVENTS: CodeEvent[] = [
  {
    code: "export function Button() {\n  return (\n    <button",
    ui: {},
  },
  { code: "\n      style={{", ui: {} },
  {
    code: '\n        background: "#3b82f6",',
    ui: { background: "#3b82f6" },
  },
  {
    code: '\n        color: "white",',
    ui: { color: "white" },
  },
  {
    code: '\n        padding: "12px 28px",',
    ui: { padding: "12px 28px" },
  },
  {
    code: '\n        borderRadius: "999px",',
    ui: { borderRadius: "999px" },
  },
  {
    code: "\n        fontWeight: 600,",
    ui: { fontWeight: 600 },
  },
  {
    code: "\n      }}\n    >\n      Ship it\n    </button>\n  );\n}",
    ui: { label: "Ship it" },
  },
];

const CHARS_PER_FRAME = 1.6;
const DWELL_FRAMES = 5;
const INITIAL_OFFSET = 8;

interface TimelineEntry extends CodeEvent {
  start: number;
  end: number;
}

const TIMELINE: TimelineEntry[] = (() => {
  let cursor = INITIAL_OFFSET;
  return EVENTS.map((ev) => {
    const start = cursor;
    const end = start + Math.ceil(ev.code.length / CHARS_PER_FRAME);
    cursor = end + DWELL_FRAMES;
    return { ...ev, start, end };
  });
})();
const TIMELINE_END = TIMELINE[TIMELINE.length - 1].end;

function highlightLine(line: string, accentColor: string) {
  const tokens: { text: string; color: string }[] = [];
  const regex =
    /(\bexport\b|\bfunction\b|\breturn\b)|("[^"]*")|(\b[a-zA-Z_][a-zA-Z0-9_]*)(?=:)|(\{|\}|\(|\)|<|>|\/)|([0-9]+)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null = regex.exec(line);
  while (m !== null) {
    if (m.index > lastIndex) {
      tokens.push({
        text: line.slice(lastIndex, m.index),
        color: "#e4e4e7",
      });
    }
    if (m[1]) tokens.push({ text: m[1], color: "#c084fc" });
    else if (m[2]) tokens.push({ text: m[2], color: "#86efac" });
    else if (m[3]) tokens.push({ text: m[3], color: accentColor });
    else if (m[4]) tokens.push({ text: m[4], color: "#71717a" });
    else if (m[5]) tokens.push({ text: m[5], color: "#fbbf24" });
    lastIndex = regex.lastIndex;
    m = regex.exec(line);
  }
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), color: "#e4e4e7" });
  }
  return tokens;
}

export function LiveCodeCompilation({
  accentColor = "#3b82f6",
  speed = 1,
  className,
}: LiveCodeCompilationProps) {
  const frame = useCurrentFrame() * speed;

  let visibleCode = "";
  const ui: UIState = {};
  for (const t of TIMELINE) {
    if (frame < t.start) break;
    const elapsed = frame - t.start;
    const charsTyped = Math.min(
      t.code.length,
      Math.floor(elapsed * CHARS_PER_FRAME)
    );
    visibleCode += t.code.slice(0, charsTyped);
    if (frame >= t.end) Object.assign(ui, t.ui);
  }

  const lines = visibleCode.split("\n");
  const buttonLabel = ui.label ?? "Button";

  const cursorVisible =
    frame < TIMELINE_END && Math.floor(frame / 12) % 2 === 0;
  const lastLineIndex = lines.length - 1;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background: "#070708",
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
        display: "flex",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(59,130,246,0.08), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(168,85,247,0.06), transparent 60%)",
        }}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 560,
            position: "relative",
            borderRadius: 14,
            padding: 1,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.06) 100%)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              borderRadius: 13,
              background: "rgba(12,12,14,0.85)",
              backdropFilter: "blur(20px)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 38,
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 6,
                  background: "#ff5f57",
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 6,
                  background: "#febc2e",
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 6,
                  background: "#28c840",
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  marginLeft: 12,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: MONO_FAMILY,
                }}
              >
                Button.tsx
              </div>
            </div>
            <div
              style={{
                padding: "20px 22px",
                fontFamily: MONO_FAMILY,
                fontSize: 14,
                lineHeight: 1.65,
                color: "#e4e4e7",
                minHeight: 360,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {lines.map((line, i) => {
                const tokens = highlightLine(line, accentColor);
                const isLast = i === lastLineIndex;
                return (
                  <div key={i} style={{ display: "flex", whiteSpace: "pre" }}>
                    <span
                      style={{
                        width: 28,
                        color: "rgba(255,255,255,0.2)",
                        userSelect: "none",
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span>
                      {tokens.length === 0 ? (
                        <span>&nbsp;</span>
                      ) : (
                        tokens.map((t, j) => (
                          <span key={j} style={{ color: t.color }}>
                            {t.text}
                          </span>
                        ))
                      )}
                      {isLast && cursorVisible && (
                        <span
                          style={{
                            display: "inline-block",
                            width: 8,
                            height: 16,
                            marginLeft: 1,
                            verticalAlign: "text-bottom",
                            background: accentColor,
                          }}
                        />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          background:
            "repeating-conic-gradient(rgba(255,255,255,0.018) 0deg 90deg, transparent 90deg 180deg) 0 0 / 28px 28px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: "#22c55e",
              boxShadow: "0 0 8px #22c55e",
            }}
          />
          <div
            style={{
              fontSize: 11,
              fontFamily: MONO_FAMILY,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Preview · HMR
          </div>
        </div>

        {/* Animated robot - builds as code is typed */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 400,
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Build progress - robot grows from 0% to 100% */}
          <div
            style={{
              width: 220,
              height: 340,
              position: "relative",
              transform: `scale(${Math.min(1, frame / TIMELINE_END)})`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Robot body */}
            <div
              style={{
                width: 220,
                height: 280,
                background: "linear-gradient(145deg, #1a1a1c 0%, #0a0a0a 100%)",
                borderRadius: "60px 60px 30px 30px",
                position: "relative",
                boxShadow: "0 30px 80px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.08)",
                border: "2px solid rgba(255,255,255,0.12)",
                opacity: frame >= TIMELINE[2]?.start ? 1 : 0.3,
              }}
            >
              {/* Robot head */}
              <div
                style={{
                  width: 100,
                  height: 100,
                  background: "linear-gradient(145deg, #2d2d30 0%, #121214 100%)",
                  borderRadius: "50px",
                  position: "absolute",
                  top: -50,
                  left: "50%",
                  transform: "translateX(-50%)",
                  border: "2px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.8), inset 0 -2px 8px rgba(0,0,0,0.5)",
                  opacity: frame >= TIMELINE[0]?.start ? 1 : 0,
                }}
              >
                {/* Eyes - glow when code is complete */}
                <div
                  style={{
                    width: 18,
                    height: 18,
                    background: frame >= TIMELINE_END ? accentColor : "#333",
                    borderRadius: "50%",
                    position: "absolute",
                    top: 38,
                    left: 24,
                    boxShadow: frame >= TIMELINE_END ? `0 0 16px ${accentColor}, 0 0 4px ${accentColor}` : "none",
                    transition: "all 0.4s ease",
                  }}
                />
                <div
                  style={{
                    width: 18,
                    height: 18,
                    background: frame >= TIMELINE_END ? accentColor : "#333",
                    borderRadius: "50%",
                    position: "absolute",
                    top: 38,
                    right: 24,
                    boxShadow: frame >= TIMELINE_END ? `0 0 16px ${accentColor}, 0 0 4px ${accentColor}` : "none",
                    transition: "all 0.4s ease",
                  }}
                />
                
                {/* Antenna */}
                <div
                  style={{
                    width: 3,
                    height: 20,
                    background: "linear-gradient(180deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05))",
                    position: "absolute",
                    top: -18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    borderRadius: 2,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      background: frame >= TIMELINE_END ? accentColor : "#444",
                      borderRadius: "50%",
                      position: "absolute",
                      top: -6,
                      left: "50%",
                      transform: "translateX(-50%)",
                      boxShadow: frame >= TIMELINE_END ? `0 0 12px ${accentColor}` : "none",
                    }}
                  />
                </div>
              </div>

              {/* Body chest panel - appears with code progress */}
              <div
                style={{
                  width: 140,
                  height: 100,
                  background: "linear-gradient(145deg, rgba(59,130,246,0.08), rgba(147,51,234,0.05))",
                  borderRadius: 20,
                  position: "absolute",
                  top: 80,
                  left: "50%",
                  transform: "translateX(-50%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: frame >= TIMELINE[4]?.start ? 1 : 0.2,
                  transition: "opacity 0.3s ease",
                }}
              >
                {/* Inner glow when complete */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 80,
                    height: 80,
                    background: accentColor,
                    borderRadius: "50%",
                    opacity: frame >= TIMELINE_END ? 0.25 : 0,
                    filter: "blur(30px)",
                    transition: "opacity 0.6s ease",
                  }}
                />
              </div>

              {/* Arms */}
              <div
                style={{
                  width: 50,
                  height: 140,
                  background: "linear-gradient(90deg, #1a1a1c 0%, #0f0f10 100%)",
                  borderRadius: "25px 10px 10px 25px",
                  position: "absolute",
                  top: 80,
                  left: -30,
                  border: "2px solid rgba(255,255,255,0.1)",
                  opacity: frame >= TIMELINE[5]?.start ? 1 : 0.3,
                }}
              />
              <div
                style={{
                  width: 50,
                  height: 140,
                  background: "linear-gradient(90deg, #0f0f10 0%, #1a1a1c 100%)",
                  borderRadius: "10px 25px 25px 10px",
                  position: "absolute",
                  top: 80,
                  right: -30,
                  border: "2px solid rgba(255,255,255,0.1)",
                  opacity: frame >= TIMELINE[5]?.start ? 1 : 0.3,
                }}
              />
            </div>

            {/* Legs */}
            <div
              style={{
                width: 60,
                height: 90,
                background: "linear-gradient(180deg, #1a1a1c 0%, #0a0a0a 100%)",
                borderRadius: "15px 15px 20px 20px",
                position: "absolute",
                bottom: -10,
                left: 40,
                border: "2px solid rgba(255,255,255,0.1)",
                opacity: frame >= TIMELINE[6]?.start ? 1 : 0.3,
              }}
            />
            <div
              style={{
                width: 60,
                height: 90,
                background: "linear-gradient(180deg, #1a1a1c 0%, #0a0a0a 100%)",
                borderRadius: "15px 15px 20px 20px",
                position: "absolute",
                bottom: -10,
                right: 40,
                border: "2px solid rgba(255,255,255,0.1)",
                opacity: frame >= TIMELINE[6]?.start ? 1 : 0.3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
