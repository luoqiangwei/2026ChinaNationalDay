import Reveal from "@/components/Reveal";
import { Backpack, CalendarDays, CheckCircle2, ClipboardList, Ticket } from "lucide-react";

const reminders = [
  "莫高窟 A 类票提前 30 天放票（10/1 的票 9/1 开抢）；九寨沟、陕历博、兵马俑均为实名分时段预约，放票日定闹钟",
  "国庆机票提前 4–5 周价格最优；9/25 出发（中秋假）比 10/1 便宜约 40%",
  "青甘/川西租车国庆每日上浮，尽早锁单；北疆禾木木屋一房难求，先订房再排行程",
  "海外线：日本签证约 7 个工作日现在办来得及；泰国、济州免签（出行前再核实政策）",
];

const packing = [
  "身份证/护照 + 复印件",
  "充电宝（2 万毫安内登机）",
  "常用药 + 肠胃药",
  "防晒霜 SPF50+ / 润唇膏",
  "薄羽绒/抓绒（高原线必带）",
  "折叠伞 + 保温杯",
  "相机 + 备用电池",
  "车载充电器（自驾线）",
];

export default function Guide() {
  return (
    <main className="max-w-4xl mx-auto px-5 pt-12">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.25em] text-[#88837C] flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-[#E85A3C]" /> Before You Go
        </p>
        <h1 className="mt-2 font-display font-bold text-4xl">行前必备</h1>
      </Reveal>

      {/* 2026 假期事实（紧凑） */}
      <Reveal>
        <div className="mt-8 rounded-2xl bg-[#1A4A48] text-[#F3EEE5] p-6 text-sm leading-relaxed">
          <p className="flex items-center gap-2 text-[#F4A8A8] text-xs uppercase tracking-[0.25em] mb-3">
            <CalendarDays className="w-4 h-4" /> 2026 放假安排（国务院通知）
          </p>
          <p>
            <b className="text-white">国庆 10/1(四)–10/7(三) 共 7 天</b>；调休上班 9/20(日)、10/10(六)。
            中秋 9/25–27 单独放 3 天，<b className="text-white">与国庆不相连</b>——别再按“连休 8 天”的旧经验安排。
          </p>
          <p className="mt-2 text-[#F3EEE5]/80">
            拼假：9/28–30 请 3 天年假 → 9/25–10/7 连休 13 天。高速免费 10/1 0:00–10/7 24:00（7 座及以下，中秋不免费）。
          </p>
        </div>
      </Reveal>

      {/* 预订提醒 */}
      <Reveal>
        <div className="mt-6 rounded-2xl bg-white/80 border border-[#101010]/10 p-6">
          <p className="font-display font-bold text-lg text-[#1A4A48] flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#E85A3C]" /> 订票订房提醒
          </p>
          <ul className="mt-4 space-y-3">
            {reminders.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm text-[#3A3733] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1A4A48]/50 shrink-0" /> {r}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* 行李 */}
      <Reveal>
        <div className="mt-6 rounded-2xl bg-white/80 border border-[#101010]/10 p-6">
          <p className="font-display font-bold text-lg text-[#1A4A48] flex items-center gap-2">
            <Backpack className="w-5 h-5 text-[#E85A3C]" /> 两个人的行李箱
          </p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {packing.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-[#3A3733]">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1A4A48]/50 shrink-0" /> {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[#88837C]">
            高原线（青甘/北疆/川西/九寨）加：毛线帽、手套、暖宝宝、葡萄糖；海岛线加：防晒衣、驱蚊水、手机防水袋。
          </p>
        </div>
      </Reveal>

      <p className="mt-10 text-xs text-[#88837C] leading-relaxed">
        数据说明：放假安排依据国办发明电〔2025〕7 号通知；各路线气温/湿度为 10 月上旬多年气候参考均值，详情见每条路线页；
        门票与价格为 2026 年旺季公开参考价，请以实际预订为准。图片来源 Unsplash，为氛围参考图。
      </p>
    </main>
  );
}
