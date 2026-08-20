import { routes, type RouteData } from "@/data/routes";
import Reveal from "@/components/Reveal";
import { ArrowRight, Camera, Car, Heart, MapPin, Plane } from "lucide-react";

const heroPhotos = [
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=70", cap: "九寨沟 · 彩林", tilt: "-6deg" },
  { src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=70", cap: "京都 · 古寺", tilt: "4deg" },
  { src: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=600&q=70", cap: "喀纳斯 · 金秋", tilt: "-3deg" },
  { src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=600&q=70", cap: "敦煌 · 大漠", tilt: "5deg" },
];

function RouteCard({ route, onOpen, index }: { route: RouteData; onOpen: (id: string) => void; index: number }) {
  return (
    <Reveal delay={(index % 3) * 90}>
      <button
        onClick={() => onOpen(route.id)}
        className="lift group w-full text-left bg-white/80 rounded-2xl overflow-hidden border border-[#101010]/10"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={route.hero}
            alt={route.heroCaption}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {route.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full text-[11px] bg-white/90 text-[#1A4A48] font-medium">
                {t}
              </span>
            ))}
          </div>
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <p className="text-[11px] opacity-85 flex items-center gap-1">
              <Camera className="w-3 h-3" /> {route.heroCaption}
            </p>
            <h3 className="font-display text-xl font-bold leading-snug mt-0.5">{route.name}</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-[#5A564E] line-clamp-1">{route.tagline}</p>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-1 text-[#88837C] text-xs">
              <MapPin className="w-3.5 h-3.5" /> {route.region}
            </span>
            <span className="text-xs text-[#88837C]">
              {route.days} 天 · 10月 {route.temp.split("·")[0]} · <b className="text-[#E85A3C]">{route.budget.split("/")[0].trim()}</b>
            </span>
          </div>
          <div className="mt-2 flex justify-end">
            <span className="inline-flex items-center gap-1 text-[#E85A3C] text-sm font-medium group-hover:gap-2 transition-all">
              看攻略 <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

export default function Home({ onOpen, onGuide }: { onOpen: (id: string) => void; onGuide: () => void }) {
  const driveRoutes = routes.filter((r) => r.tags.includes("官方精品线路"));
  const domestic = routes.filter((r) => !r.tags.includes("官方精品线路") && !r.tags.includes("海外"));
  const overseas = routes.filter((r) => r.tags.includes("海外"));

  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="relative max-w-6xl mx-auto px-5 pt-14 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A4A48] text-white text-xs tracking-widest">
                <Heart className="w-3.5 h-3.5 text-[#F4A8A8]" /> 2026 国庆黄金周 · 情侣双人攻略
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display font-bold text-[42px] md:text-[58px] leading-[1.12] text-[#101010]">
                7 天假期，
                <br />
                <span className="text-[#E85A3C] wavy-underline inline-block">15 条路线</span>
                任选一条去爱
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[#5A564E] leading-relaxed max-w-md">
                从北京出发，国内 12 条 + 海外 3 条。每条路线按天规划、逐日配图，
                含手绘路线图、出片机位与 10 月当地天气——已按 2026 年最新放假安排校准。
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#routes"
                  className="px-6 py-3 rounded-full bg-[#E85A3C] text-white font-medium hover:bg-[#d44d31] transition-colors inline-flex items-center gap-2"
                >
                  挑选路线 <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={onGuide}
                  className="px-6 py-3 rounded-full border-2 border-[#1A4A48] text-[#1A4A48] font-medium hover:bg-[#1A4A48] hover:text-white transition-colors"
                >
                  行前必备清单
                </button>
              </div>
            </Reveal>
          </div>

          {/* 漂浮照片墙 */}
          <div className="relative h-[380px] hidden lg:block">
            {heroPhotos.map((p, i) => (
              <figure
                key={p.cap}
                className={`absolute w-52 bg-white p-2.5 pb-8 rounded-lg shadow-xl ${i % 2 ? "floaty-slow" : "floaty"}`}
                style={
                  {
                    "--tilt": p.tilt,
                    top: `${[4, 8, 46, 50][i]}%`,
                    left: `${[4, 54, 0, 50][i]}%`,
                  } as React.CSSProperties
                }
              >
                <img src={p.src} alt={p.cap} className="w-full aspect-[4/5] object-cover rounded" loading="lazy" />
                <figcaption className="absolute bottom-2 left-0 right-0 text-center text-xs text-[#5A564E] font-hand">
                  {p.cap}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 路线分组 ===== */}
      <section id="routes" className="max-w-6xl mx-auto px-5 space-y-16">
        <div>
          <Reveal>
            <div className="flex items-center gap-3 mb-7">
              <span className="w-10 h-10 rounded-xl bg-[#E85A3C] text-white flex items-center justify-center"><Car className="w-5 h-5" /></span>
              <div>
                <h2 className="font-display font-bold text-2xl">官方同款 · 精品自驾公路线</h2>
                <p className="text-sm text-[#88837C]">
                  对接交通运输部“三环四横五纵”精品自驾公路（2026-08 发布） · 国庆高速免费 10/1–10/7
                </p>
              </div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {driveRoutes.map((r, i) => (
              <RouteCard key={r.id} route={r} onOpen={onOpen} index={i} />
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <div className="flex items-center gap-3 mb-7">
              <span className="w-10 h-10 rounded-xl bg-[#1A4A48] text-white flex items-center justify-center"><MapPin className="w-5 h-5" /></span>
              <div>
                <h2 className="font-display font-bold text-2xl">国内经典 · 高铁直达</h2>
                <p className="text-sm text-[#88837C]">古都、山水与海岸，适合 4–6 天中短途</p>
              </div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domestic.map((r, i) => (
              <RouteCard key={r.id} route={r} onOpen={onOpen} index={i} />
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <div className="flex items-center gap-3 mb-7">
              <span className="w-10 h-10 rounded-xl bg-[#C8899A] text-white flex items-center justify-center"><Plane className="w-5 h-5" /></span>
              <div>
                <h2 className="font-display font-bold text-2xl">海外短线 · 免签优先</h2>
                <p className="text-sm text-[#88837C]">飞行 3.5h 内，济州/泰国免签，日本签证需抓紧</p>
              </div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {overseas.map((r, i) => (
              <RouteCard key={r.id} route={r} onOpen={onOpen} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
