import { useMemo } from "react";
import type { RouteData } from "@/data/routes";

/**
 * 手绘风 SVG 路线地图（v3 防重叠）：
 * 1. 坐标归一化进安全区
 * 2. 斥力松弛：过近的节点互相推开（最小间距），密集簇自动散开
 * 3. 里程标签沿连线法线两侧取位，避开节点
 * 4. 节点标签 8 个候选位贪心避让（避开节点、里程标签、已放标签）
 */

interface Pt { name: string; type: "start" | "city" | "spot"; px: number; py: number }
interface Box { x1: number; y1: number; x2: number; y2: number }
const overlap = (a: Box, b: Box) => a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
const inBounds = (b: Box) => b.x1 >= 0.5 && b.x2 <= 99.5 && b.y1 >= 0.5 && b.y2 <= 62.5;

const MIN_DIST = 13; // 节点最小间距（viewBox 单位）

function spreadPoints(pts: Pt[]): Pt[] {
  const p = pts.map((s) => ({ ...s }));
  for (let iter = 0; iter < 120; iter++) {
    let moved = false;
    for (let i = 0; i < p.length; i++) {
      for (let j = i + 1; j < p.length; j++) {
        let dx = p[j].px - p[i].px;
        let dy = p[j].py - p[i].py;
        let d = Math.sqrt(dx * dx + dy * dy);
        if (d < MIN_DIST) {
          if (d < 0.01) { dx = Math.random() - 0.5; dy = Math.random() - 0.5; d = 1; }
          const push = ((MIN_DIST - d) / 2) * 0.7;
          const ux = dx / d;
          const uy = dy / d;
          p[i].px -= ux * push;
          p[i].py -= uy * push;
          p[j].px += ux * push;
          p[j].py += uy * push;
          moved = true;
        }
      }
    }
    for (const pt of p) {
      pt.px = Math.min(91, Math.max(9, pt.px));
      pt.py = Math.min(53, Math.max(9, pt.py));
    }
    if (!moved) break;
  }
  return p;
}

export default function RouteMap({ route }: { route: RouteData }) {
  const { stops, legs } = route;

  const layout = useMemo(() => {
    // 1) 归一化到安全区
    const xs = stops.map((s) => s.x);
    const ys = stops.map((s) => s.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const sx = maxX - minX < 1 ? () => 50 : (v: number) => 14 + ((v - minX) / (maxX - minX)) * 72;
    const sy = maxY - minY < 1 ? () => 31 : (v: number) => 12 + ((v - minY) / (maxY - minY)) * 38;
    const pts = spreadPoints(stops.map((s) => ({ name: s.name, type: s.type, px: sx(s.x), py: sy(s.y) })));

    // 节点障碍盒（供标签避让）
    const nodeBoxes: Box[] = pts.map((p) => ({
      x1: p.px - 2.6,
      y1: p.py - (p.type === "start" ? 2.8 : 2.0),
      x2: p.px + 2.6,
      y2: p.py + (p.type === "start" ? 3.2 : 2.0),
    }));

    // 2) 路径
    const paths = legs.map((leg) => {
      const a = pts[leg.from];
      const b = pts[leg.to];
      const mx = (a.px + b.px) / 2;
      const my = (a.py + b.py) / 2;
      const dx = b.px - a.px;
      const dy = b.py - a.py;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const curve = Math.min(6, len * 0.18);
      const cx = mx - (dy / len) * curve;
      const cy = my + (dx / len) * curve;
      return {
        d: `M ${a.px} ${a.py} Q ${cx} ${cy} ${b.px} ${b.py}`,
        label: leg.label,
        // 法线方向（用于里程标签取位）
        nx: -dy / len,
        ny: dx / len,
        qx: (mx + cx) / 2,
        qy: (my + cy) / 2,
      };
    });

    // 3) 里程标签：法线两侧近/远 4 个候选，避开节点盒
    const placed: Box[] = [];
    const legLabels = paths.map((p) => {
      const w = Math.max(3, p.label.length * 2.3 * 1.05);
      const h = 3.3;
      const cands = [
        { x: p.qx + p.nx * 2.6, y: p.qy + p.ny * 2.6 },
        { x: p.qx - p.nx * 2.6, y: p.qy - p.ny * 2.6 },
        { x: p.qx + p.nx * 5, y: p.qy + p.ny * 5 },
        { x: p.qx - p.nx * 5, y: p.qy - p.ny * 5 },
        { x: p.qx, y: p.qy - 2.4 },
      ];
      let chosen = cands[4];
      for (const c of cands) {
        const box: Box = { x1: c.x - w / 2, y1: c.y - h / 2, x2: c.x + w / 2, y2: c.y + h / 2 };
        if (inBounds(box) && !nodeBoxes.some((n) => overlap(n, box)) && !placed.some((q) => overlap(q, box))) {
          chosen = c;
          break;
        }
      }
      const box: Box = { x1: chosen.x - w / 2, y1: chosen.y - h / 2, x2: chosen.x + w / 2, y2: chosen.y + h / 2 };
      placed.push(box);
      return { x: Math.min(94, Math.max(6, chosen.x)), y: Math.min(59, Math.max(4, chosen.y)), label: p.label };
    });

    // 4) 节点标签：8 候选位贪心避让（障碍 = 节点盒 + 里程标签 + 已放标签）
    const dirs: { dx: number; dy: number; anchor: "start" | "middle" | "end" }[] = [
      { dx: 0, dy: 4.0, anchor: "middle" },   // 下近
      { dx: 0, dy: -2.6, anchor: "middle" },  // 上近
      { dx: 3.0, dy: 1.1, anchor: "start" },  // 右
      { dx: -3.0, dy: 1.1, anchor: "end" },   // 左
      { dx: 0, dy: 8.0, anchor: "middle" },   // 下远
      { dx: 0, dy: -6.6, anchor: "middle" },  // 上远
      { dx: 2.6, dy: -2.2, anchor: "start" }, // 右上
      { dx: -2.6, dy: -2.2, anchor: "end" },  // 左上
    ];
    const nodeLabels = pts.map((s, i) => {
      const fs = s.type === "spot" ? 2.7 : 3.1;
      const w = Math.max(3, s.name.length * fs * 1.05);
      const h = fs + 1.2;
      let best = dirs[0];
      for (const dir of dirs) {
        const cx = s.px + dir.dx;
        const cy = s.py + dir.dy;
        const x1 = dir.anchor === "middle" ? cx - w / 2 : dir.anchor === "start" ? cx : cx - w;
        const box: Box = { x1, y1: cy - h + 0.6, x2: x1 + w, y2: cy + 0.9 };
        const hitNode = nodeBoxes.some((n, j) => j !== i && overlap(n, box));
        if (inBounds(box) && !hitNode && !placed.some((q) => overlap(q, box))) {
          best = dir;
          break;
        }
      }
      const cx = Math.min(96, Math.max(4, s.px + best.dx));
      const cy = Math.min(60.5, Math.max(3.8, s.py + best.dy));
      const x1 = best.anchor === "middle" ? cx - w / 2 : best.anchor === "start" ? cx : cx - w;
      placed.push({ x1, y1: cy - h + 0.6, x2: x1 + w, y2: cy + 0.9 });
      return { s, tx: cx, ty: cy, anchor: best.anchor, fs };
    });

    return { pts, paths, legLabels, nodeLabels };
  }, [stops, legs]);

  const { paths, legLabels, nodeLabels } = layout;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#101010]/10 bg-[#FBF7EE]">
      <div className="flex items-center justify-between px-4 pt-3">
        <p className="text-xs uppercase tracking-[0.25em] text-[#88837C]">Route Map · 行程路径</p>
        <p className="text-[11px] text-[#88837C]">示意图 · 非等比例</p>
      </div>
      <svg viewBox="0 0 100 64" className="w-full block" role="img" aria-label={`${route.name} 路线示意图`}>
        <defs>
          <pattern id="mapgrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#1A4A48" strokeOpacity="0.06" strokeWidth="0.25" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100" height="64" fill="url(#mapgrid)" rx="2" />

        {/* 罗盘 */}
        <g transform="translate(93,8)" opacity="0.7">
          <circle r="4.2" fill="none" stroke="#1A4A48" strokeWidth="0.35" />
          <path d="M 0 -3.4 L 1.1 1.4 L 0 0.6 L -1.1 1.4 Z" fill="#E85A3C" />
          <text y="-5.6" textAnchor="middle" fontSize="2.6" fill="#1A4A48" fontWeight="600">N</text>
        </g>

        {/* 路径 */}
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke="#1A4A48"
            strokeWidth="0.55"
            strokeLinecap="round"
            strokeDasharray="2.2 1.6"
            opacity="0.85"
          >
            <animate attributeName="stroke-dashoffset" from="7.6" to="0" dur="1.6s" repeatCount="indefinite" />
          </path>
        ))}

        {/* 里程标签（避让后） */}
        {legLabels.map((l, i) => (
          <text
            key={`lb-${i}`}
            x={l.x}
            y={l.y}
            textAnchor="middle"
            fontSize="2.3"
            fill="#5A564E"
            paintOrder="stroke"
            stroke="#FBF7EE"
            strokeWidth="0.9"
            strokeLinejoin="round"
          >
            {l.label}
          </text>
        ))}

        {/* 节点 + 避让后的标签 */}
        {nodeLabels.map(({ s, tx, ty, anchor, fs }) => (
          <g key={s.name}>
            {s.type === "start" ? (
              <g transform={`translate(${s.px},${s.py})`}>
                <circle r="2.6" fill="#E85A3C" opacity="0.25">
                  <animate attributeName="r" from="1.8" to="3.6" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <path d="M 0 -2.1 C 1.3 -2.1 2.1 -1.2 2.1 -0.2 C 2.1 1.3 0 2.6 0 2.6 C 0 2.6 -2.1 1.3 -2.1 -0.2 C -2.1 -1.2 -1.3 -2.1 0 -2.1 Z" fill="#E85A3C" stroke="#fff" strokeWidth="0.35" />
                <circle cy="-0.35" r="0.65" fill="#fff" />
              </g>
            ) : s.type === "city" ? (
              <circle cx={s.px} cy={s.py} r="1.45" fill="#1A4A48" stroke="#FBF7EE" strokeWidth="0.5" />
            ) : (
              <circle cx={s.px} cy={s.py} r="1.05" fill="#F3EEE5" stroke="#E85A3C" strokeWidth="0.55" />
            )}
            <text
              x={tx}
              y={ty}
              textAnchor={anchor}
              fontSize={fs}
              fontWeight={s.type === "spot" ? "400" : "600"}
              fill={s.type === "start" ? "#E85A3C" : "#1A4A48"}
              paintOrder="stroke"
              stroke="#FBF7EE"
              strokeWidth="0.9"
              strokeLinejoin="round"
            >
              {s.name}
            </text>
          </g>
        ))}
      </svg>

      {/* 图例 */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 px-4 pb-3 text-[11px] text-[#5A564E]">
        <span className="inline-flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1.5C7.8 1.5 9 2.9 9 4.4 9 6.3 6 8.3 6 8.3S3 6.3 3 4.4C3 2.9 4.2 1.5 6 1.5Z" fill="#E85A3C" /><circle cx="6" cy="4.2" r="1" fill="#fff" /></svg>
          行程起点
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="3.4" fill="#1A4A48" /></svg>
          住宿城市
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="3" fill="#F3EEE5" stroke="#E85A3C" strokeWidth="1.4" /></svg>
          途经景点
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="20" height="8" viewBox="0 0 20 8"><path d="M0 4 H20" stroke="#1A4A48" strokeWidth="1.4" strokeDasharray="4 3" /></svg>
          区间交通（时长/里程）
        </span>
      </div>
    </div>
  );
}
