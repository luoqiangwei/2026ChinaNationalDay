import { useEffect, useRef, useState } from "react";
import { getRoute, routes } from "@/data/routes";
import RouteMap from "@/components/RouteMap";
import Reveal from "@/components/Reveal";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Camera,
  Car,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Lightbulb,
  MapPin,
  Plane,
  Ship,
  Sparkles,
  Train,
  Wallet,
} from "lucide-react";

const transportIcon = { flight: Plane, train: Train, car: Car, ship: Ship } as const;
const transportLabel = { flight: "飞机", train: "高铁/动车", car: "自驾", ship: "轮渡" } as const;

export default function RouteDetail({
  id,
  onBack,
  onGuide,
  onOpen,
}: {
  id: string;
  onBack: () => void;
  onGuide: () => void;
  onOpen: (id: string) => void;
}) {
  const route = getRoute(id);
  const [dayIdx, setDayIdx] = useState(0);
  const dayRef = useRef<HTMLDivElement>(null);

  useEffect(() => setDayIdx(0), [id]);

  if (!route) {
    return (
      <main className="max-w-6xl mx-auto px-5 py-20 text-center">
        <p className="text-lg text-[#5A564E]">没有找到这条路线。</p>
        <button onClick={onBack} className="mt-4 px-6 py-2.5 rounded-full bg-[#1A4A48] text-white">
          返回路线总览
        </button>
      </main>
    );
  }

  const related = routes.filter((r) => r.id !== route.id && r.tags.some((t) => route.tags.includes(t))).slice(0, 3);
  const rel = related.length ? related : routes.filter((r) => r.id !== route.id).slice(0, 3);
  const day = route.itinerary[Math.min(dayIdx, route.itinerary.length - 1)];

  const pickDay = (i: number) => {
    setDayIdx(i);
    dayRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      {/* ===== 大图 Hero ===== */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-5 pt-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-[#5A564E] hover:text-[#E85A3C] transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" /> 返回路线总览
          </button>
        </div>
        <div className="relative max-w-6xl mx-auto px-5">
          <div className="photo-frame relative overflow-hidden rounded-3xl aspect-[16/8] md:aspect-[16/6.5]">
            <img src={route.hero} alt={route.heroCaption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
              <div className="flex flex-wrap gap-2 mb-3">
                {route.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs">
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="font-display font-bold text-3xl md:text-5xl">{route.name}</h1>
              <p className="mt-2 text-white/85">{route.tagline}</p>
            </div>
            <p className="absolute top-4 right-5 text-[11px] text-white/80 bg-black/30 backdrop-blur px-3 py-1.5 rounded-full inline-flex items-center gap-1">
              <Camera className="w-3 h-3" /> {route.heroCaption}
            </p>
          </div>
        </div>
      </section>

      {/* ===== 关键信息（天气低调一行） ===== */}
      <section className="max-w-6xl mx-auto px-5 mt-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#5A564E]">
          <span><b className="text-[#1A4A48]">{route.days}</b> 天</span>
          <span>两人预算 <b className="text-[#E85A3C]">{route.budget.split("/")[0].trim()}</b></span>
          <span>{route.temp}</span>
          <span>湿度 {route.humidity}</span>
          <span>拥挤 {route.crowd}</span>
          <span className="inline-flex items-center gap-1 text-[#88837C]"><MapPin className="w-3.5 h-3.5" />{route.region}</span>
        </div>
        <p className="mt-2 text-xs text-[#88837C] leading-relaxed">
          🌤 {route.seasonNote}　·　👕 {route.clothing}　·　💰 {route.budgetNote}
        </p>
        {route.official && (
          <p className="mt-2 text-xs text-[#1A4A48]">
            <BadgeCheck className="w-3.5 h-3.5 inline mr-1 text-[#E85A3C]" />
            {route.official}
          </p>
        )}
      </section>

      {/* ===== 行程纵览 ===== */}
      <section className="max-w-6xl mx-auto px-5 mt-12">
        <Reveal>
          <h2 className="font-display font-bold text-2xl mb-2">行程纵览</h2>
          <p className="text-sm text-[#88837C] mb-6">一眼看全 {route.days} 天 · 点任意一天看当天完整安排</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {route.itinerary.map((d, i) => (
            <Reveal key={d.day} delay={i * 50}>
              <button
                onClick={() => pickDay(i)}
                className="lift group w-full text-left rounded-2xl overflow-hidden bg-white/80 border border-[#101010]/10"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={d.img} alt={d.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/55 backdrop-blur text-white text-xs font-bold tracking-widest">
                    {d.day}
                  </span>
                </div>
                <div className="p-3.5">
                  <p className="font-display font-bold text-[15px] text-[#1A4A48] leading-snug">{d.title}</p>
                  <p className="mt-1 text-xs text-[#88837C] leading-relaxed line-clamp-2">{d.summary}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 地图路径 ===== */}
      <section className="max-w-6xl mx-auto px-5 mt-12">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-xl bg-[#1A4A48] text-white flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </span>
            <h2 className="font-display font-bold text-2xl">路线地图 · {route.stops.length} 站</h2>
          </div>
          <RouteMap route={route} />
          {route.drive && <p className="mt-3 text-sm text-[#5A564E] leading-relaxed">🚗 {route.drive}</p>}
        </Reveal>
      </section>

      {/* ===== 每日详细行程（Day 切换 + 时间轴） ===== */}
      <section ref={dayRef} className="max-w-6xl mx-auto px-5 mt-14 scroll-mt-24">
        <Reveal>
          <h2 className="font-display font-bold text-2xl mb-6">每日行程 · 按天查看</h2>
        </Reveal>

        {/* Day 切换 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {route.itinerary.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setDayIdx(i)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${
                i === dayIdx
                  ? "bg-[#E85A3C] text-white border-[#E85A3C]"
                  : "bg-white/70 text-[#5A564E] border-[#101010]/10 hover:border-[#E85A3C]/50"
              }`}
            >
              <span className="block text-[10px] tracking-widest opacity-70">DAY</span>
              {i + 1}
            </button>
          ))}
        </div>

        {/* 当天卡片 */}
        <div className="rounded-3xl bg-white/85 border border-[#101010]/10 overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {/* 当天图片 */}
            <figure className="lg:col-span-2 relative min-h-[260px]">
              <img key={day.day} src={day.img} alt={day.imgCaption} className="absolute inset-0 w-full h-full object-cover" />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 pt-10 pb-4 text-white text-sm flex items-start gap-2">
                <Camera className="w-4 h-4 mt-0.5 shrink-0" /> {day.imgCaption}
              </figcaption>
            </figure>

            {/* 当天时间轴 */}
            <div className="lg:col-span-3 p-6 md:p-8">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-display font-bold text-5xl text-[#E85A3C]">{day.day}</span>
                <h3 className="font-display font-bold text-2xl text-[#101010]">{day.title}</h3>
              </div>
              <p className="mt-1.5 text-sm text-[#88837C]">{day.subtitle}</p>

              <div className="mt-6 relative pl-6 space-y-5 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-[#E85A3C]/30">
                {day.events.map((e) => (
                  <div key={e.time + e.title} className="relative">
                    <span className="absolute -left-6 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-[#E85A3C] bg-[#F3EEE5]" />
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="text-sm font-bold text-[#E85A3C] tabular-nums">{e.time}</span>
                      <span className="font-semibold text-[#1A4A48]">{e.title}</span>
                    </div>
                    <p className="mt-1 text-sm text-[#5A564E] leading-relaxed">{e.desc}</p>
                  </div>
                ))}
              </div>

              {day.photoSpot && (
                <p className="mt-6 inline-flex items-start gap-2 text-sm text-[#7A4A00] bg-[#FFF6E8] border border-[#E8C98A]/60 rounded-xl px-4 py-2.5">
                  <Camera className="w-4 h-4 mt-0.5 shrink-0" />
                  <span><b>出片机位：</b>{day.photoSpot}</span>
                </p>
              )}

              {/* 上一天 / 下一天 */}
              <div className="mt-7 pt-5 border-t border-[#101010]/10 flex items-center justify-between">
                <button
                  onClick={() => pickDay(Math.max(0, dayIdx - 1))}
                  disabled={dayIdx === 0}
                  className="inline-flex items-center gap-1.5 text-sm text-[#5A564E] hover:text-[#E85A3C] disabled:opacity-30 disabled:hover:text-[#5A564E] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> {dayIdx > 0 ? `Day ${dayIdx}` : "已是首日"}
                </button>
                <button
                  onClick={() => pickDay(Math.min(route.itinerary.length - 1, dayIdx + 1))}
                  disabled={dayIdx === route.itinerary.length - 1}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A4A48] text-white text-sm hover:bg-[#123936] disabled:opacity-30 transition-colors"
                >
                  {dayIdx < route.itinerary.length - 1 ? `Day ${dayIdx + 2}` : "已是末日"} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 亮点与贴士 ===== */}
      <section className="max-w-6xl mx-auto px-5 mt-16 grid md:grid-cols-2 gap-5">
        <Reveal>
          <div className="h-full rounded-2xl bg-white/80 border border-[#101010]/10 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#88837C] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E85A3C]" /> 不可错过
            </p>
            <ul className="mt-4 space-y-2.5">
              {route.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-[#3A3733]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E85A3C] shrink-0" /> {h}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div className="h-full rounded-2xl bg-[#FFF6E8] border border-[#E8C98A]/60 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#7A4A00] flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> 避坑贴士
            </p>
            <ul className="mt-4 space-y-2.5">
              {route.tips.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[#5A4A2A]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C8899A] shrink-0" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ===== 费用与住行规划 ===== */}
      <section className="max-w-6xl mx-auto px-5 mt-12">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-9 h-9 rounded-xl bg-[#E85A3C] text-white flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-display font-bold text-2xl">费用与住行 · 两人合计</h2>
              <p className="text-sm text-[#88837C]">国庆旺季参考价，提前订有惊喜，临期买两行泪</p>
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* 费用分解 */}
          <Reveal>
            <div className="h-full rounded-2xl bg-white/80 border border-[#101010]/10 p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[#88837C] flex items-center gap-2 mb-5">
                <CircleDollarSign className="w-4 h-4 text-[#E85A3C]" /> 钱花在哪
              </p>
              {(() => {
                const total = route.costs.reduce((s, c) => s + c.amount, 0);
                const max = Math.max(...route.costs.map((c) => c.amount));
                return (
                  <>
                    <ul className="space-y-4">
                      {route.costs.map((c) => (
                        <li key={c.label}>
                          <div className="flex items-baseline justify-between gap-3 text-sm">
                            <span className="font-medium text-[#1A4A48]">{c.label}</span>
                            <span className="font-bold text-[#101010] tabular-nums">¥{c.amount.toLocaleString()}</span>
                          </div>
                          <div className="mt-1.5 h-2 rounded-full bg-[#101010]/5 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#1A4A48] to-[#E85A3C]"
                              style={{ width: `${Math.max(6, (c.amount / max) * 100)}%` }}
                            />
                          </div>
                          <p className="mt-1 text-xs text-[#88837C]">{c.note}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 pt-4 border-t border-dashed border-[#101010]/15 flex items-baseline justify-between">
                      <span className="text-sm text-[#5A564E]">两人合计约</span>
                      <span className="font-display font-bold text-2xl text-[#E85A3C] tabular-nums">¥{total.toLocaleString()}</span>
                    </div>
                  </>
                );
              })()}
            </div>
          </Reveal>

          {/* 大交通 */}
          <Reveal delay={90}>
            <div className="h-full rounded-2xl bg-white/80 border border-[#101010]/10 p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[#88837C] flex items-center gap-2 mb-5">
                <Plane className="w-4 h-4 text-[#E85A3C]" /> 大交通怎么订
              </p>
              <ul className="space-y-4">
                {route.transport.map((t) => {
                  const Icon = transportIcon[t.type];
                  return (
                    <li key={t.direction} className="flex gap-3">
                      <span className="w-9 h-9 rounded-xl bg-[#1A4A48]/5 border border-[#1A4A48]/15 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#1A4A48]" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <span className="text-sm font-semibold text-[#1A4A48]">{t.direction}</span>
                          <span className="text-xs text-[#88837C]">{transportLabel[t.type]}</span>
                          <span className="text-sm font-bold text-[#E85A3C] tabular-nums">{t.price}</span>
                        </div>
                        <p className="mt-0.5 text-sm text-[#3A3733]">{t.detail}</p>
                        {t.tip && <p className="mt-1 text-xs text-[#88837C]">💡 {t.tip}</p>}
                      </div>
                    </li>
                  );
                })}
              </ul>
              {route.transportTips && route.transportTips.length > 0 && (
                <ul className="mt-5 pt-4 border-t border-dashed border-[#101010]/15 space-y-1.5">
                  {route.transportTips.map((t) => (
                    <li key={t} className="text-xs text-[#5A564E] leading-relaxed flex items-start gap-1.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#E85A3C] shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </div>

        {/* 住哪里 */}
        <Reveal delay={120}>
          <div className="mt-5 rounded-2xl bg-white/80 border border-[#101010]/10 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#88837C] flex items-center gap-2 mb-5">
              <BedDouble className="w-4 h-4 text-[#E85A3C]" /> 住哪里
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {route.hotels.map((h) => (
                <div key={h.name} className="rounded-xl bg-[#F3EEE5]/70 border border-[#101010]/5 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#1A4A48] text-white text-[10px]">{h.tag}</span>
                    <span className="text-sm font-bold text-[#E85A3C] tabular-nums">{h.price}</span>
                  </div>
                  <p className="mt-2.5 font-semibold text-sm text-[#1A4A48]">{h.name}</p>
                  <p className="text-xs text-[#88837C] mt-0.5">{h.area}</p>
                  <p className="mt-2 text-[13px] text-[#5A564E] leading-relaxed">{h.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>


      {/* ===== 相关路线 ===== */}
      <section className="max-w-6xl mx-auto px-5 mt-16">
        <h2 className="font-display font-bold text-2xl mb-6">再看看别的</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {rel.map((r) => (
            <button
              key={r.id}
              onClick={() => onOpen(r.id)}
              className="lift group relative rounded-2xl overflow-hidden aspect-[16/9] text-left"
            >
              <img src={r.hero} alt={r.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-display font-bold text-lg">{r.name}</p>
                <p className="text-xs text-white/80 mt-0.5 inline-flex items-center gap-1">
                  {r.days} 天 · {r.temp.split("·")[0]} · 查看攻略 <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={onGuide}
            className="px-8 py-3 rounded-full bg-[#1A4A48] text-white font-medium hover:bg-[#123936] transition-colors"
          >
            查看行前必备清单
          </button>
        </div>
      </section>
    </main>
  );
}
