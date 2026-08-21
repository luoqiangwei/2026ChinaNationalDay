// ============================================================
// 路线数据聚合入口（17 条 · 2026 国庆情侣攻略 + 清明樱花季）
// 每条路线的完整数据见 ./routes/<id>.ts
// ============================================================

import type { RouteData } from "./types";
import { dali } from "./routes/dali";
import { jiuzhai } from "./routes/jiuzhai";
import { xian } from "./routes/xian";
import { qingdao } from "./routes/qingdao";
import { kyoto } from "./routes/kyoto";
import { chiangmai } from "./routes/chiangmai";
import { jeju } from "./routes/jeju";
import { qinggan } from "./routes/qinggan";
import { kanas } from "./routes/kanas";
import { daocheng } from "./routes/daocheng";
import { guilin } from "./routes/guilin";
import { xiamen } from "./routes/xiamen";
import { shanxi } from "./routes/shanxi";
import { ejina } from "./routes/ejina";
import { zhangjiajie } from "./routes/zhangjiajie";
import { sakura } from "./routes/sakura";
import { meili } from "./routes/meili";

export type { RouteData, RouteStop, RouteLeg, DayPlan, DayEvent } from "./types";

export const routes: RouteData[] = [
  dali,
  jiuzhai,
  xian,
  qingdao,
  kyoto,
  chiangmai,
  jeju,
  qinggan,
  kanas,
  daocheng,
  guilin,
  xiamen,
  shanxi,
  ejina,
  zhangjiajie,
  sakura,
  meili,
];

export const getRoute = (id: string) => routes.find((r) => r.id === id);
