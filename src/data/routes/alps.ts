// ============================================================
// 路线数据 · 法瑞意 · 阿尔卑斯观景列车线（2026 国庆 9/25–10/5，11天10晚，巴黎进罗马出）
// 5 家酒店 4 次搬行李：巴黎2晚→霞慕尼2晚→劳特布龙嫩2晚→采尔马特2晚→罗马2晚
// 法签逻辑：法国4晚＝瑞士4晚、法国首站，按申根“停留最长/相同则首入国”规则向法国申请
// ============================================================

import type { RouteData } from "../types";

const img = (id: string, w = 1600) => `images/u-${id}-${w}.jpg`;

// 图片槽位（均已下载到 public/images 并逐张核验内容）
const IM = {
  hero: "photo-1506905925346-21bda4d32df4", // 阿尔卑斯群峰云海日落
  d1: "photo-1502602898657-3e91760cbb34", // 巴黎铁塔与塞纳河暮色
  d2: "photo-1551634979-2b11f8c946fe", // 卢浮宫金字塔夜景
  d3: "photo-1517021897933-0e0319cfbc28", // 霞慕尼冰川山谷与花岗岩尖峰
  d4: "photo-1553677856-035da1f4500b", // 南针峰尖顶
  d5: "photo-1607585011081-241d2bacb7de", // 劳特布龙嫩山谷（翁根视角）
  d6: "photo-1527668752968-14dc70a27c95", // 高山草甸与木屋（氛围参考）
  d7: "photo-1563917145018-7bf1a0f21760", // 少女峰群山全景步道
  d8: "photo-1553670590-f58a6135f69e", // 红色登山火车与冰川群峰（氛围参考）
  d9: "photo-1506905925346-21bda4d32df4", // 车窗外阿尔卑斯群峰（复用 hero 素材）
  d10: "photo-1552832230-c0197dd311b5", // 罗马斗兽场
  d11: "photo-1531572753322-ad063cecc140", // 圣彼得广场俯瞰
  g1: "photo-1499856871958-5b9627545d1a", // 亚历山大三世桥黄昏
  g2: "photo-1736326930319-b53af7c46c82", // 霞慕尼 Brévent 缆车与勃朗峰
  g3: "photo-1585821244330-7029d402beb2", // Montenvers 红色齿轨火车与冰海冰川
  g5: "photo-1554880142-7f99f32b5043", // Gimmelwald 山间木屋旅舍
  g8: "photo-1525874684015-58379d421a52", // 罗马特莱维喷泉
};

export const alps: RouteData = {
  id: "alps",
  name: "法瑞意 · 阿尔卑斯观景列车",
  tagline: "从塞纳河到马特洪峰，11 天看尽阿尔卑斯的三种表情",
  region: "法瑞意 · 巴黎→霞慕尼→劳特布龙嫩→采尔马特→罗马",
  tags: ["海外", "申根签", "观景列车", "雪山"],
  days: 11,
  budget: "¥44,000–54,000 / 两人",
  budgetNote:
    "开口程机票（巴黎进罗马出）提前 8 周锁价；瑞士段是大头，半价卡 CHF120/人/月基本稳回本；南针峰、Gornergrat 等缆车占门票支出近半",
  temp: "9月末–10月初 巴黎11–20°C · 山区-5–15°C · 罗马14–25°C",
  humidity: "约 70%",
  seasonNote:
    "初秋阿尔卑斯山顶可能已飘雪，南针峰与冰川项目受大风影响大，晴天窗口优先上高点；罗马正是最舒服的季节",
  clothing: "洋葱式：羽绒服+抓绒+冲锋衣，山顶 -5°C 起；罗马中午单衣即可；防滑徒步鞋必备，别穿白鞋上冰川",
  crowd: "★★★☆☆",
  hero: img(IM.hero),
  heroCaption: "阿尔卑斯 · 云海之上的群峰日落",
  drive:
    "全程铁路为主：巴黎—日内瓦 TGV Lyria 直达，瑞士境内火车+缆车无缝衔接；霞慕尼—劳特布龙嫩一段建议包车约 3h 门到门；采尔马特禁普通汽车，列车直接开进镇中心",
  costs: [
    { label: "往返机票（开口程）", amount: 13000, note: "巴黎进、罗马出，直飞或一次转机 ¥6,000–8,500/人" },
    { label: "住宿 10 晚", amount: 13000, note: "巴黎2+霞慕尼2+劳特布龙嫩2+采尔马特2+罗马2，均选有电梯+行李房的酒店" },
    { label: "餐饮", amount: 7000, note: "人均 ¥150–250/餐，瑞士偏贵，多利用超市与酒店早餐" },
    { label: "城际铁路", amount: 5500, note: "TGV Lyria+瑞士各段（半价卡后）+米兰→罗马 Frecciarossa" },
    { label: "观景火车与缆车", amount: 4500, note: "南针峰+Montenvers+少女峰区缆车+Gornergrat，两人合计" },
    { label: "门票·签证·保险", amount: 2500, note: "卢浮宫/斗兽场/梵蒂冈 + 法签 + 全程旅行保险" },
    { label: "霞慕尼→劳特布龙嫩包车", amount: 2200, note: "门到门约 3h，含两个大箱空间；省钱可火车 5 次换乘" },
  ],
  transport: [
    {
      type: "flight",
      direction: "去程 · 9月25日",
      detail: "北京 → 巴黎 直飞约 10–11h",
      price: "¥6,000–8,500/人往返",
      tip: "买巴黎进、罗马出的开口程；法签出签后再锁票，行程单按法国4晚+首站法国来做",
    },
    {
      type: "train",
      direction: "城际 · 9月27日",
      detail: "巴黎里昂车站 → 日内瓦 TGV Lyria 直达约 3h11，接送车再 1h15 到霞慕尼",
      price: "¥600–1,100/人",
      tip: "优先 06:18/08:18 早班；TGV Lyria 行李限 130×90×50cm 且需自行一次搬完，记得贴姓名标签",
    },
    {
      type: "car",
      direction: "城际 · 9月29日",
      detail: "霞慕尼酒店 → 劳特布龙嫩酒店 包车约 3h 门到门",
      price: "¥1,800–2,600/车",
      tip: "全程唯一建议花钱改善体验的一段；省钱备选是火车经 Vallorcine/Martigny/Visp/Spiez 换 5 次约 4.5–5h",
    },
    {
      type: "train",
      direction: "城际 · 10月1日",
      detail: "劳特布龙嫩 → Interlaken Ost → Spiez → Visp → 采尔马特 约 2.5h",
      price: "持半价卡约 ¥300–500/人",
      tip: "拒绝订票系统给的 5–7 分钟极限换乘，手动放宽到 15–20 分钟，宁可等下一班",
    },
    {
      type: "train",
      direction: "城际 · 10月3日",
      detail: "采尔马特 → 米兰中央车站 → 罗马 Termini 全程约 8h",
      price: "约 ¥800–1,400/人",
      tip: "Domodossola 段 10/1–3 前后施工：直达 EC 受影响就走 Bern/Zürich—Lugano 全铁路备选，坚决不坐替代大巴",
    },
    {
      type: "flight",
      direction: "回程 · 10月5日",
      detail: "罗马 → 北京 直飞约 10–11h 或一次转机",
      price: "含开口程票价",
      tip: "最好选傍晚或夜间航班，D11 白天还能留给梵蒂冈；早班机会让罗马只剩一个完整日",
    },
  ],
  transportTips: [
    "瑞士半价卡（Half Fare Card，约 CHF120/人/月）对这条多段铁路+缆车的线路基本稳回本，先到日内瓦再买",
    "不要用 SBB 站到站行李托运：普通服务当天交运、后天才能取，每站只住两晚根本等不到箱子",
    "SBB 提醒 2026 年跨境意大利铁路持续施工，每次出发前在 SBB App 查数字时刻表",
    "米兰只换车不住宿，Milano Centrale → Roma Termini 的 Frecciarossa 最快约 2h50、班次密，买可改签票并留 60–90 分钟换乘",
    "两个大箱一人一个、各背一个小包，别再增加登机箱；大箱里放 AirTag，证件现金相机全程随身",
  ],
  hotels: [
    {
      name: "巴士底—里昂车站一带酒店",
      area: "巴黎 · 12区 Gare de Lyon 周边",
      price: "¥900–1,300/晚",
      reason: "D3 早班 TGV 打车 10 分钟内到车站，带两个大箱子不用横穿巴黎；务必选有电梯+行李寄存",
      tag: "赶车友好",
    },
    {
      name: "南针峰缆车站附近酒店",
      area: "霞慕尼 · Chamonix Sud",
      price: "¥1,000–1,400/晚",
      reason: "缆车站与 Montenvers 火车站步行圈，看天气窗口随时上山",
      tag: "上山便利",
    },
    {
      name: "火车站旁山谷酒店",
      area: "劳特布龙嫩 · 车站 300–500m",
      price: "¥1,300–1,700/晚",
      reason: "D7 把箱子寄存前台、轻装去 Männlichen；别带大箱子住米伦/翁根，上下缆车太狼狈",
      tag: "行李寄存",
    },
    {
      name: "车站下段木屋酒店",
      area: "采尔马特 · Bahnhofstrasse",
      price: "¥1,400–1,900/晚",
      reason: "无车小镇里近车站最省事，可预约酒店电动车接站；Gornergrat 车站就在对面",
      tag: "近车站",
    },
    {
      name: "Monti 区电梯酒店",
      area: "罗马 · Monti / Repubblica",
      price: "¥900–1,400/晚",
      reason: "老楼务必确认有电梯；打车到 Termini 与斗兽场都方便，别订无人前台的公寓",
      tag: "电梯必备",
    },
  ],
  stops: [
    { name: "巴黎", x: 12, y: 15, type: "start" },
    { name: "日内瓦", x: 28, y: 38, type: "spot" },
    { name: "霞慕尼", x: 36, y: 48, type: "city" },
    { name: "南针峰", x: 44, y: 40, type: "spot" },
    { name: "劳特布龙嫩", x: 50, y: 26, type: "city" },
    { name: "米伦", x: 45, y: 18, type: "spot" },
    { name: "采尔马特", x: 58, y: 60, type: "city" },
    { name: "马特洪峰", x: 67, y: 65, type: "spot" },
    { name: "罗马", x: 80, y: 90, type: "city" },
  ],
  legs: [
    { from: 0, to: 1, label: "TGV 约 3h11" },
    { from: 1, to: 2, label: "接送车 约 1h15" },
    { from: 2, to: 3, label: "缆车 约 20min" },
    { from: 2, to: 4, label: "包车 约 3h" },
    { from: 4, to: 5, label: "缆车+火车 约 25min" },
    { from: 4, to: 6, label: "火车 约 2.5h" },
    { from: 6, to: 7, label: "登山火车 约 33min" },
    { from: 6, to: 8, label: "火车 约 8h" },
  ],
  itinerary: [
    {
      day: "D1",
      title: "落地巴黎 · 塞纳河的傍晚",
      subtitle: "第一天什么都不预约，把时差交给河岸与铁塔",
      summary: "抵达巴黎打车进城，塞纳河—杜乐丽—铁塔夜景",
      events: [
        {
          time: "12:00",
          title: "抵达巴黎 · 打车进城",
          desc: "落地后直接打车去酒店，不安排任何需要预约的景点。酒店选巴士底—玛黑区东侧—里昂车站一带，D3 早班 TGV 不用横穿巴黎。",
        },
        {
          time: "15:00",
          title: "入住放行李",
          desc: "确认酒店有电梯+前台行李寄存，这五个住宿点全程都按这个标准订。",
        },
        {
          time: "16:30",
          title: "塞纳河 → 杜乐丽花园 → 协和广场",
          desc: "沿河岸慢慢走，体力不够就砍半，今天唯一的任务是倒时差。",
        },
        {
          time: "18:30",
          title: "亚历山大三世桥",
          desc: "金色雕像与铁塔同框的经典机位，傍晚光线最好。",
        },
        {
          time: "20:00",
          title: "埃菲尔铁塔夜景",
          desc: "日落后整点闪灯 5 分钟，看完打车回酒店早睡。",
        },
      ],
      img: img(IM.d1, 1200),
      imgCaption: "巴黎 · 塞纳河畔的铁塔暮色",
      gallery: [img(IM.g1, 800)],
      photoSpot: "亚历山大三世桥 · 金色雕像与铁塔同框",
    },
    {
      day: "D2",
      title: "博物馆与蒙马特 · 巴黎一日",
      subtitle: "上午交给艺术，下午交给山坡上的白教堂",
      summary: "卢浮宫或奥赛二选一，凯旋门，蒙马特高地看日落",
      events: [
        {
          time: "08:30",
          title: "卢浮宫 或 奥赛博物馆",
          desc: "二选一、提前预约首场。别贪：同一天塞卢浮宫+凡尔赛+凯旋门+蒙马特只会毁掉后面的行程体力。",
        },
        {
          time: "12:30",
          title: "玛黑区午餐",
          desc: "回酒店顺路的区域，法棍三明治或露天小馆都行。",
        },
        {
          time: "14:30",
          title: "香榭丽舍 → 凯旋门",
          desc: "登顶看 12 条放射大道；不想排队就在戴高乐环岛外拍照。",
        },
        {
          time: "17:00",
          title: "蒙马特高地 · 圣心堂",
          desc: "白色教堂前的台阶是巴黎屋顶全景的免费看台，日落时分最佳。",
        },
        {
          time: "19:30",
          title: "回酒店整理行李",
          desc: "明早不坐巴黎地铁拖箱子，直接打车去 Gare de Lyon。",
        },
      ],
      img: img(IM.d2, 1200),
      imgCaption: "巴黎 · 卢浮宫金字塔之夜",
      photoSpot: "圣心堂台阶 · 巴黎屋顶全景",
    },
    {
      day: "D3",
      title: "TGV 南下 · 初见勃朗峰",
      subtitle: "三个小时，从都市直接坐进冰川脚下",
      summary: "早班 TGV 到日内瓦，接送车进霞慕尼，下午 Montenvers 看冰川",
      events: [
        {
          time: "07:00",
          title: "打车到巴黎里昂车站",
          desc: "带两个大箱子别挑战早高峰地铁，十几欧买个体面的早晨。",
        },
        {
          time: "08:18",
          title: "TGV Lyria → 日内瓦",
          desc: "直达约 3h11，另有 06:18 更早班；行李限 130×90×50cm、需自行一次搬完并贴姓名标签。",
        },
        {
          time: "12:00",
          title: "预约接送车 → 霞慕尼",
          desc: "日内瓦机场出发约 1h15，车辆有大件行李空间，提前按航班/车次约好。",
        },
        {
          time: "14:00",
          title: "入住霞慕尼酒店",
          desc: "箱子直接放酒店，下午轻装出门。",
        },
        {
          time: "15:30",
          title: "Montenvers 红色齿轨火车",
          desc: "约 20 分钟上到 1913 米看冰海冰川。注意：冰洞及下段设施 9 月 28 日起进入维护关闭期，今天赶得上就优先去冰洞，赶不上单坐火车看冰川也值。",
        },
      ],
      img: img(IM.d3, 1200),
      imgCaption: "霞慕尼 · 冰海冰川与花岗岩尖峰",
      gallery: [img(IM.g2, 800), img(IM.g3, 800)],
      photoSpot: "Montenvers 观景台 · 冰河与德吕峰",
    },
    {
      day: "D4",
      title: "南针峰 · 3842 米的晴天窗口",
      subtitle: "把最好的天气，留给最高的观景台",
      summary: "晴天直上南针峰，下午按 D3 进度补 Montenvers 或镇上散步",
      events: [
        {
          time: "07:30",
          title: "看实时摄像头与风速",
          desc: "当天顺序不要提前定死：南针峰受强风结冰影响会临时关闭，晴朗窗口优先上山。",
        },
        {
          time: "08:30",
          title: "Aiguille du Midi 南针峰缆车",
          desc: "直达约 3842 米，官方要求预约具体时段，临近会放票；山顶 -5°C 起，羽绒服穿上。",
        },
        {
          time: "12:30",
          title: "回镇上午餐",
          desc: "霞慕尼镇中心餐馆集中，顺便观察山上云量变化。",
        },
        {
          time: "15:00",
          title: "灵活半天",
          desc: "D3 去过 Montenvers 就在镇上和河边散步；没去过就补红色小火车；南针峰被云遮住就先等天气窗口再上。",
        },
      ],
      img: img(IM.d4, 1200),
      imgCaption: "南针峰 · 3842 米的花岗岩尖顶",
      photoSpot: "南针峰观景台 · 勃朗峰近景",
    },
    {
      day: "D5",
      title: "跨国转场 · 瀑布山谷",
      subtitle: "全程唯一一次包车，把行李直接送到下一家酒店",
      summary: "包车约 3h 门到门进瑞士，下午劳特布龙嫩看瀑布",
      events: [
        {
          time: "09:00",
          title: "包车出发",
          desc: "霞慕尼酒店 → 劳特布龙嫩酒店约 3h，平台报价通常含每人一个大箱+随身包，下单前按日期重新询价确认。",
        },
        {
          time: "12:00",
          title: "抵达劳特布龙嫩",
          desc: "箱子放酒店（有行李房，退房后也可寄存），下午完全轻装。",
        },
        {
          time: "15:00",
          title: "Staubbachfall 瀑布 → 教堂",
          desc: "镇口的标志性瀑布，教堂前的取景框是山谷最经典的构图。",
        },
        {
          time: "16:30",
          title: "山谷草地与沿河散步",
          desc: "72 条瀑布的 U 形冰川谷，平地慢走就是风景；早睡，明天上山。",
        },
      ],
      img: img(IM.d5, 1200),
      imgCaption: "劳特布龙嫩山谷 · 雪峰下的木屋村落",
      photoSpot: "教堂前 · 瀑布与山谷的经典构图",
    },
    {
      day: "D6",
      title: "米伦环线 · 无汽车山村",
      subtitle: "缆车、山地火车，和一段雪山牧场步道",
      summary: "Grütschalp—Winteregg—米伦—Gimmelwald 环线，完全不碰箱子",
      events: [
        {
          time: "08:30",
          title: "缆车到 Grütschalp",
          desc: "劳特布龙嫩车站有无障碍地下通道，Wengen 与 Mürren 两个方向都从这里分线。",
        },
        {
          time: "09:30",
          title: "山地火车到 Winteregg",
          desc: "Mürrenbahn 沿悬崖开行，右侧车窗正对少女峰群山。",
        },
        {
          time: "10:00",
          title: "Winteregg → Mürren 步行",
          desc: "全程最值得走的一段：雪山、牧场、木屋，不是困难登山，慢走拍照约 1.5h。",
        },
        {
          time: "13:00",
          title: "米伦午餐",
          desc: "无汽车山村，随便找家看得见悬崖的餐厅。",
        },
        {
          time: "15:00",
          title: "Gimmelwald → Stechelberg → 回镇",
          desc: "走或坐车到 Gimmelwald，缆车下到 Stechelberg，公交沿谷回劳特布龙嫩；别为打卡雪朗峰把一天花在换缆车上。",
        },
      ],
      img: img(IM.d6, 1200),
      imgCaption: "少女峰区 · 雪山草甸与木屋（氛围参考）",
      gallery: [img(IM.g5, 800)],
      photoSpot: "Winteregg 步道 · 少女峰群山与牧场",
    },
    {
      day: "D7",
      title: "Männlichen 全景步道 · 傍晚转场",
      subtitle: "白天把箱子寄存在酒店，轻装走完最经典的 4.5 公里",
      summary: "门利兴全景步道，16 点取行李坐火车去采尔马特",
      events: [
        {
          time: "08:00",
          title: "退房 · 行李留酒店",
          desc: "两个大箱寄存前台，只背当天小包——全程唯一“白天玩山、晚上搬酒店”的日子。",
        },
        {
          time: "09:00",
          title: "经 Wengen 缆车上 Männlichen",
          desc: "山顶先走 Royal Walk 皇冠观景台，三面雪山环抱。",
        },
        {
          time: "10:30",
          title: "Panorama Trail → Kleine Scheidegg",
          desc: "官方长度约 4.5km、净步行约 1h20，一路正对少女峰群；连拍照休息留 3–4h。",
        },
        {
          time: "14:30",
          title: "经 Wengen 回劳特布龙嫩",
          desc: "下山喝杯咖啡，等 16 点取箱子。",
        },
        {
          time: "16:00",
          title: "取行李 · 火车去采尔马特",
          desc: "Lauterbrunnen → Interlaken Ost → Spiez → Visp → Zermatt，换乘手动放宽到 15–20 分钟。",
        },
        {
          time: "20:00",
          title: "抵达采尔马特",
          desc: "提前让酒店确认晚间入住，近车站或预约电动车接站。",
        },
      ],
      img: img(IM.d7, 1200),
      imgCaption: "门利兴 · 少女峰群山前的全景步道",
      photoSpot: "Männlichen · Royal Walk 皇冠观景台",
    },
    {
      day: "D8",
      title: "Gornergrat · 马特洪峰倒影",
      subtitle: "拉开窗帘看见马特洪峰，就立刻出发",
      summary: "Gornergrat 登山火车，Riffelsee 拍倒影，徒步到 Riffelberg",
      events: [
        {
          time: "07:00",
          title: "赶早班 Gornergrat 火车",
          desc: "车站就在采尔马特主火车站对面，首班约 07:00，08:00 后每 24 分钟一班；别先吃一小时早餐。",
        },
        {
          time: "08:30",
          title: "Gornergrat 观景台",
          desc: "马特洪峰与 Gorner 冰川同框，上午顺光。",
        },
        {
          time: "10:00",
          title: "坐火车回 Rotenboden → Riffelsee",
          desc: "无风时湖面形成最经典的马特洪峰倒影，抓紧拍。",
        },
        {
          time: "11:00",
          title: "徒步到 Riffelberg",
          desc: "约 3.1km、1 小时、难度中等，一路下望冰川；再坐火车回镇。",
        },
        {
          time: "15:00",
          title: "无车小镇闲逛",
          desc: "采尔马特禁普通汽车，镇内步行/电动出租/免费电动公交；全阴天就把 Gornergrat 推到 D9 清晨、搭较晚火车去罗马。",
        },
      ],
      img: img(IM.d8, 1200),
      imgCaption: "Gornergrat 登山火车 · 驶向冰川群峰（氛围参考）",
      photoSpot: "Riffelsee · 马特洪峰湖面倒影",
    },
    {
      day: "D9",
      title: "最长交通日 · 一路向南",
      subtitle: "八小时铁路，从冰川坐到古罗马",
      summary: "火车约 8h 经米兰换乘到罗马，坚决不坐替代大巴",
      events: [
        {
          time: "08:00",
          title: "采尔马特出发",
          desc: "常规走 Visp/Brig → Domodossola → 米兰；但 10/1–3 前后 Domodossola—米兰线施工，直达 EC 受影响就改走 Bern/Zürich → Lugano → 米兰的全铁路备选。",
        },
        {
          time: "13:00",
          title: "Milano Centrale 换乘",
          desc: "米兰只换不住，留 60–90 分钟余量，Frecciarossa 买可改签票；任何含铁路替代大巴的方案都直接放弃，两个大箱子太痛苦。",
        },
        {
          time: "15:00",
          title: "Frecciarossa → Roma Termini",
          desc: "最快约 2h50、班次密集；意大利段箱子放视线范围内，拉链可加个钢丝锁。",
        },
        {
          time: "18:30",
          title: "打车到酒店",
          desc: "别拖箱子坐罗马地铁；酒店选 Monti/Repubblica 一带有电梯的。",
        },
        {
          time: "20:00",
          title: "酒店附近晚餐",
          desc: "长途日后不安排景点，披萨和红酒就是今晚的全部行程。",
        },
      ],
      img: img(IM.d9, 1200),
      imgCaption: "车窗外 · 阿尔卑斯群峰（氛围参考）",
      photoSpot: "Milano Centrale · 穹顶站台仰拍",
    },
    {
      day: "D10",
      title: "古罗马一日 · 从斗兽场到喷泉",
      subtitle: "两千年的石头，一个下午走完",
      summary: "斗兽场—古罗马广场—万神殿—纳沃纳—特莱维喷泉，夜宿罗马",
      events: [
        {
          time: "08:30",
          title: "斗兽场 → 古罗马广场 → 帕拉蒂尼山",
          desc: "联票提前预约上午场，国庆余票掉得快；广场与帕拉蒂尼从斗兽场直接走过去。",
        },
        {
          time: "13:00",
          title: "Monti 区午餐",
          desc: "斗兽场北侧的本地人街区，比景区门口便宜一半。",
        },
        {
          time: "15:30",
          title: "威尼斯广场 → 万神殿",
          desc: "万神殿内部免费（以现场政策为准），穹顶圆孔的光柱别错过。",
        },
        {
          time: "17:30",
          title: "纳沃纳广场 → 特莱维喷泉 → 西班牙广场",
          desc: "傍晚一线串起三大广场，许愿池背身抛硬币。",
        },
        {
          time: "20:00",
          title: "Trastevere 晚餐",
          desc: "台伯河西岸的老区，石板路小馆最有罗马味道。",
        },
      ],
      img: img(IM.d10, 1200),
      imgCaption: "罗马 · 斗兽场的拱门与斜阳",
      gallery: [img(IM.g8, 800)],
      photoSpot: "斗兽场地铁站北侧台阶 · 拱门全景",
    },
    {
      day: "D11",
      title: "罗马半日 · 告别",
      subtitle: "最后半天留给梵蒂冈，或者什么都不做",
      summary: "梵蒂冈博物馆或老城闲逛，傍晚航班返程",
      events: [
        {
          time: "09:00",
          title: "梵蒂冈博物馆 + 圣彼得大教堂",
          desc: "二选一方案：提前预约博物馆上午场；或者不约任何大景点，只在老城喝咖啡闲逛——两种都对。",
        },
        {
          time: "13:00",
          title: "回酒店取行李",
          desc: "退房时寄存的箱子取回，前台帮忙叫车。",
        },
        {
          time: "15:00",
          title: "打车去 FCO 机场",
          desc: "傍晚或夜间航班才不浪费这半天；若只能搭中午前的航班，整趟行程应改成删采尔马特的 4 酒店版。",
        },
      ],
      img: img(IM.d11, 1200),
      imgCaption: "罗马 · 圣彼得广场的柱廊",
      photoSpot: "圣彼得广场 · 柱廊环抱",
    },
  ],
  highlights: [
    "南针峰 3842 米直面勃朗峰",
    "Montenvers 红色齿轨火车与冰海冰川",
    "劳特布龙嫩 72 瀑布山谷",
    "Männlichen 全景步道",
    "Gornergrat 望马特洪峰",
    "Riffelsee 湖面倒影",
  ],
  tips: [
    "法签逻辑：法国 4 晚＝瑞士 4 晚、法国是首站，符合申根“停留最长/相同则首入国”规则；行程单与酒店订单按这版做，别用瑞士更长的旧版",
    "南针峰先看实时摄像头与风速再上山，晴朗窗口优先；官方要求预约具体时段，临近会放票",
    "冰洞 9 月 28 日起维护关闭：D3 下午赶得上就优先去，赶不上单坐 Montenvers 红色小火车看冰川也值",
    "D7 的两个大箱子寄存劳特布龙嫩酒店，轻装走 Männlichen，下午 16 点回来取，全程没有拖箱子进景区的日子",
    "瑞士换乘拒绝 5–7 分钟极限方案，手动放宽到 15–20 分钟；列车班次密，等下一班比拖着箱子狂奔体面",
    "10 月初 Domodossola—米兰线施工：不接受任何含替代大巴的方案，直达 EC 受影响就走 Bern/Zürich—Lugano 全铁路",
    "酒店四条件：电梯＋前台行李寄存＋可提前/退房后寄存＋近车站；别带大箱子住米伦或翁根",
    "主动放弃了 GoldenPass、冰川快车、安纳西和科莫湖：方向不顺或边际收益低，这条线的三张王牌是 Montenvers、少女峰区山地铁路和 Gornergrat",
  ],
};
