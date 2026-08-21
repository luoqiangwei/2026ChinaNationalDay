import { useEffect, useState } from "react";
import Home from "@/sections/Home";
import RouteDetail from "@/sections/RouteDetail";
import Guide from "@/sections/Guide";

export type View = { name: "home" } | { name: "route"; id: string } | { name: "guide" };

function HeartMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21s-7.5-4.9-10-9.2C.4 8.6 2.3 5 5.7 5c2 0 3.3 1.1 4.1 2.3h4.4C15 6.1 16.3 5 18.3 5c3.4 0 5.3 3.6 3.7 6.8C19.5 16.1 12 21 12 21z" transform="scale(0.92) translate(1,1)" />
    </svg>
  );
}

function parseHash(): View {
  const h = window.location.hash;
  if (h.startsWith("#route/")) return { name: "route", id: decodeURIComponent(h.slice(7)) };
  if (h === "#guide") return { name: "guide" };
  return { name: "home" };
}

export default function App() {
  const [view, setView] = useState<View>(parseHash);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [view]);

  useEffect(() => {
    const onHash = () => setView(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (v: View) => {
    if (v.name === "route") window.location.hash = `route/${encodeURIComponent(v.id)}`;
    else if (v.name === "guide") window.location.hash = "guide";
    else window.location.hash = "";
    setView(v);
  };

  return (
    <div className="min-h-screen paper-bg text-[#101010]">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#F3EEE5]/85 border-b border-[#101010]/10">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <button onClick={() => go({ name: "home" })} className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-full bg-[#E85A3C] text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
              <HeartMark className="w-[18px] h-[18px]" />
            </span>
            <span className="text-left leading-tight">
              <span className="block font-display font-bold text-[17px] tracking-wide">双节同行</span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#88837C]">Golden Week for Two</span>
            </span>
          </button>
          <nav className="flex items-center gap-1 text-sm">
            <button
              onClick={() => go({ name: "home" })}
              className={`px-4 py-2 rounded-full transition-colors ${view.name === "home" ? "bg-[#1A4A48] text-white" : "hover:bg-[#101010]/5"}`}
            >
              路线总览
            </button>
            <button
              onClick={() => go({ name: "guide" })}
              className={`px-4 py-2 rounded-full transition-colors ${view.name === "guide" ? "bg-[#1A4A48] text-white" : "hover:bg-[#101010]/5"}`}
            >
              行前必备
            </button>
          </nav>
        </div>
      </header>

      {view.name === "home" && <Home onOpen={(id) => go({ name: "route", id })} onGuide={() => go({ name: "guide" })} />}
      {view.name === "route" && (
        <RouteDetail
          id={view.id}
          onBack={() => go({ name: "home" })}
          onGuide={() => go({ name: "guide" })}
          onOpen={(rid) => go({ name: "route", id: rid })}
        />
      )}
      {view.name === "guide" && <Guide />}

      {/* 页脚 */}
      <footer className="mt-24 bg-[#1A4A48] text-[#F3EEE5]">
        <div className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-[#E85A3C] text-white flex items-center justify-center">
                <HeartMark className="w-[18px] h-[18px]" />
              </span>
              <span className="font-display font-bold text-xl">双节同行</span>
            </div>
            <p className="mt-4 text-sm text-[#F3EEE5]/70 leading-relaxed">
              2026 中秋 9/25–27（3 天不调休）· 国庆 10/1–10/7（7 天）。
              <br />
              从北京出发，为爱规划。
            </p>
          </div>
          <div className="text-sm">
            <p className="uppercase tracking-[0.25em] text-[#F4A8A8] text-xs mb-4">Routes · 17 条</p>
            <ul className="space-y-2 text-[#F3EEE5]/80">
              <li>国内 · 大理 / 九寨沟 / 西安 / 青岛威海 / 青甘环线 / 北疆喀纳斯 / 川西稻城 / 桂林阳朔 / 厦门泉州 / 山西古建 / 额济纳胡杨 / 张家界凤凰 / 滇西北梅里</li>
              <li>海外 · 京都大阪 / 清迈 / 济州岛</li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="uppercase tracking-[0.25em] text-[#F4A8A8] text-xs mb-4">Note</p>
            <p className="text-[#F3EEE5]/70 leading-relaxed">
              页面中所有价格均为参考预估，国庆旺季机酒价格波动大，请以实际预订为准；签证与免签政策请在出行前再次核实。
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-[#F3EEE5]/50 tracking-widest">
          2026 国庆中秋 · 17 条路线 · 拼假最多 13 天 · 两个人刚刚好
        </div>
      </footer>
    </div>
  );
}
