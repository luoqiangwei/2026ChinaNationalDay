// ============================================================
// 路线数据聚合入口（29 条 · 2026 国庆情侣攻略 + 清明樱花季）
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
import { malaysia } from "./routes/malaysia";
import { sabah } from "./routes/sabah";
import { nanjiang } from "./routes/nanjiang";
import { hulunbuir } from "./routes/hulunbuir";
import { guizhou } from "./routes/guizhou";
import { gannan } from "./routes/gannan";
import { changbai } from "./routes/changbai";
import { wuyuan } from "./routes/wuyuan";
import { vietnam } from "./routes/vietnam";
import { nepal } from "./routes/nepal";
import { vladivostok } from "./routes/vladivostok";
import { turkey } from "./routes/turkey";

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
  malaysia,
  sabah,
  nanjiang,
  hulunbuir,
  guizhou,
  gannan,
  changbai,
  wuyuan,
  vietnam,
  nepal,
  vladivostok,
  turkey,
];

export const getRoute = (id: string) => routes.find((r) => r.id === id);
