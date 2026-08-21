// ============================================================
// 路线数据类型定义（2026 国庆情侣攻略）
// ============================================================

export interface RouteStop {
  name: string;
  x: number; // 0-100 相对坐标（示意地图，组件会自动归一化防出界）
  y: number;
  type: "start" | "city" | "spot";
}

export interface RouteLeg {
  from: number; // stops 下标
  to: number;
  label: string; // 例如 “车程约 2h · 150km”
}

export interface DayEvent {
  time: string; // 例如 "08:00"
  title: string; // 时段标题：地点 / 活动
  desc: string; // 1–2 句具体细节（真实店名、票价、注意事项）
}

export interface DayPlan {
  day: string; // "D1"
  title: string; // 当天主题，例如 “动车进沟 · 初见秋色”
  subtitle: string; // 文艺副标题一句
  summary: string; // 纵览卡一句话（≤35 字）
  events: DayEvent[]; // 当天时间轴，4–6 个时段
  img: string; // 当天配图 URL
  imgCaption: string; // 图注（拍摄点/画面说明）
  photoSpot?: string; // 出片机位
}

export interface CostItem {
  label: string; // 费用类别，如 “往返机票”“住宿 6 晚”
  amount: number; // 两人合计金额（元）
  note: string; // 简短说明，如 “¥800/晚 海景+古城搭配”
}

export interface TransportLeg {
  type: "flight" | "train" | "car" | "ship";
  direction: string; // 如 “去程 · 10月1日”
  detail: string; // 航线/车次与时长，如 “北京首都 → 成都双流 约 2.5 小时”
  price: string; // 如 “¥1,200–1,800/人”
  tip?: string; // 实用贴士
}

export interface HotelPick {
  name: string;
  area: string; // 位置区域
  price: string; // 如 “¥500–750/晚”
  reason: string; // 推荐理由一句
  tag: string; // 短标签，如 “逛吃核心”
}

export interface RouteData {
  id: string;
  name: string;
  tagline: string;
  region: string;
  tags: string[]; // 含 “官方精品线路” 会进入首页官方同款分组
  days: number;
  budget: string;
  budgetNote: string;
  temp: string; // 含出行月份与参考气温，如 "10月 11–22°C"、"4月初 5–18°C"
  humidity: string;
  seasonNote: string; // 季节/天气一句话（低调展示）
  clothing: string;
  crowd: string;
  hero: string;
  heroCaption: string;
  official?: string; // 对接国家精品自驾旅游公路（详情页徽章文字）
  drive?: string;
  costs: CostItem[]; // 费用分解（两人合计），各项之和应与 budget 区间一致
  transport: TransportLeg[]; // 大交通规划（去程/城际/回程）
  transportTips?: string[]; // 订票贴士
  hotels: HotelPick[]; // 酒店推荐（3 家左右）
  stops: RouteStop[];
  legs: RouteLeg[];
  itinerary: DayPlan[];
  highlights: string[];
  tips: string[];
}
