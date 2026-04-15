"use client";

import { Sequence, interpolate, useCurrentFrame } from "remotion";

const FONT_MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, monospace";

const KEYWORDS = new Set([
  "import", "from", "export", "function", "const", "let", "var", "return",
  "if", "else", "for", "while", "new", "class", "extends", "default",
  "true", "false", "null", "undefined", "async", "await", "type", "interface",
]);

type Token = { text: string; kind: "code" | "comment" | "string" | "keyword" | "number" };

function tokenizeLine(line: string): Token[] {
  const trimmed = line.trimStart();
  if (trimmed.startsWith("//")) return [{ text: line, kind: "comment" }];

  const tokens: Token[] = [];
  const re = /("[^"]*"|'[^']*'|`[^`]*`|\b\d+\b|\b[A-Za-z_$][\w$]*\b|[^\w"'`]+)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(line)) !== null) {
    const t = match[0];
    const first = t[0];
    if (first === '"' || first === "'" || first === "`") {
      tokens.push({ text: t, kind: "string" });
    } else if (/^\d+$/.test(t)) {
      tokens.push({ text: t, kind: "number" });
    } else if (/^[A-Za-z_$][\w$]*$/.test(t) && KEYWORDS.has(t)) {
      tokens.push({ text: t, kind: "keyword" });
    } else {
      tokens.push({ text: t, kind: "code" });
    }
  }
  return tokens;
}

const TOKEN_COLORS: Record<Token["kind"], string> = {
  code: "#e4e4e7",
  comment: "#6b7280",
  string: "#86efac",
  keyword: "#c4b5fd",
  number: "#fcd34d",
};

function CodeLine({ line, index, fontSize }: { line: string; index: number; fontSize: number }) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ty = interpolate(frame, [0, 10], [6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tokens = tokenizeLine(line);

  if (tokens.length === 0) return <div style={{ height: fontSize * 0.7, opacity }} />;

  return (
    <div style={{ opacity, transform: `translateY(${ty}px)`, whiteSpace: "pre", display: "flex", gap: 0 }}>
      <span style={{ width: 32, color: "#4b5563", userSelect: "none", fontSize: fontSize * 0.85 }}>
        {String(index + 1).padStart(2, " ")}
      </span>
      <span>
        {tokens.map((t, i) => (
          <span key={i} style={{ color: TOKEN_COLORS[t.kind] }}>{t.text}</span>
        ))}
      </span>
    </div>
  );
}

function BackdropAura() {
  const frame = useCurrentFrame();
  const t = frame / 90;
  const x = 50 + Math.sin(t) * 25;
  const y = 50 + Math.cos(t * 0.8) * 20;
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      background: `radial-gradient(circle at ${x}% ${y}%, rgba(56,189,248,0.15), transparent 50%), radial-gradient(circle at ${100 - x}% ${100 - y}%, rgba(168,85,247,0.12), transparent 55%)`,
    }} />
  );
}

interface GlassCodeBlockProps {
  code: string;
  title: string;
  width: number;
  height: number;
  fontSize?: number;
  staggerFrames?: number;
}

export function GlassCodeBlock({ code, title, width, height, fontSize = 13, staggerFrames = 3 }: GlassCodeBlockProps) {
  const lines = code.split("\n");

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0f1e", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BackdropAura />
      <div style={{
        position: "relative", padding: 1, borderRadius: 16,
        background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)",
        width, height, boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
      }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: 15,
          background: "rgba(10,15,30,0.75)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: FONT_MONO,
        }}>
          {/* Title bar */}
          <div style={{
            height: 38, display: "flex", alignItems: "center", gap: 8, padding: "0 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.7 }} />
            ))}
            <div style={{ flex: 1, textAlign: "center", color: "#6b7280", fontSize: 12, letterSpacing: "0.02em" }}>
              {title}
            </div>
          </div>
          {/* Code */}
          <div style={{ flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 2, fontSize, lineHeight: 1.6, overflow: "hidden" }}>
            {lines.map((line, i) => (
              <Sequence key={i} from={Math.round(i * staggerFrames)} layout="none">
                <CodeLine line={line} index={i} fontSize={fontSize} />
              </Sequence>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
