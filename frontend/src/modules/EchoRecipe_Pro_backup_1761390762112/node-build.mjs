import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const ALLOWED_HOSTS = /* @__PURE__ */ new Set([
  "github.com",
  "raw.githubusercontent.com",
  "codeload.github.com",
  "api.github.com"
]);
function isAllowed(url) {
  try {
    const u = new URL(url);
    return ALLOWED_HOSTS.has(u.hostname);
  } catch {
    return false;
  }
}
function parseGithubRepo(url) {
  try {
    const u = new URL(url);
    if (u.hostname !== "github.com") return null;
    const parts = u.pathname.replace(/^\/+/, "").split("/");
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1].replace(/\.git$/, "") };
  } catch {
    return null;
  }
}
const githubRaw = async (req, res) => {
  try {
    const repo = String(req.query.repo || "");
    const branch = String(req.query.branch || "main");
    const path2 = String(req.query.path || "");
    let target = null;
    if (/raw\.githubusercontent\.com\//.test(repo)) {
      target = repo;
    } else if (isAllowed(repo)) {
      target = repo;
    } else {
      const r = parseGithubRepo(repo);
      if (!r) return res.status(400).json({ error: "Invalid GitHub repository URL" });
      const p = path2.replace(/^\/+/, "");
      target = `https://raw.githubusercontent.com/${r.owner}/${r.repo}/${encodeURIComponent(branch)}/${p}`;
    }
    if (!target) return res.status(400).json({ error: "Bad request" });
    const resp = await fetch(target, { headers: { Accept: "application/vnd.github.raw" } });
    const buf = Buffer.from(await resp.arrayBuffer());
    res.status(resp.status);
    if (resp.headers.get("content-type")) res.setHeader("Content-Type", resp.headers.get("content-type"));
    res.send(buf);
  } catch (e) {
    res.status(500).json({ error: e?.message || "Proxy error" });
  }
};
const githubZip = async (req, res) => {
  try {
    const repo = String(req.query.repo || "");
    const branch = String(req.query.branch || "main");
    let target = null;
    if (/codeload\.github\.com\//.test(repo) || /\.zip$/.test(repo)) {
      target = repo;
    } else {
      const r = parseGithubRepo(repo);
      if (!r) return res.status(400).json({ error: "Invalid GitHub repository URL" });
      target = `https://codeload.github.com/${r.owner}/${r.repo}/zip/refs/heads/${encodeURIComponent(branch)}`;
    }
    const resp = await fetch(target);
    const buf = Buffer.from(await resp.arrayBuffer());
    res.status(resp.status);
    res.setHeader("Content-Type", resp.headers.get("content-type") || "application/zip");
    res.setHeader("Content-Disposition", resp.headers.get("content-disposition") || `attachment; filename=repo.zip`);
    res.send(buf);
  } catch (e) {
    res.status(500).json({ error: e?.message || "Proxy error" });
  }
};
const makeProfile = (calories, fat, saturatedFat, transFat, carbs, fiber, sugars, protein, sodium) => ({
  calories,
  fat,
  saturatedFat,
  transFat,
  carbs,
  fiber,
  sugars,
  protein,
  sodium
});
const NUTRITION_DATABASE = {
  flour_all_purpose: makeProfile(364, 1, 0.2, 0, 76.3, 2.7, 0.3, 10.3, 2),
  flour_bread: makeProfile(361, 1.6, 0.3, 0, 72.5, 2.4, 0.4, 12.5, 3),
  flour_cake: makeProfile(357, 0.8, 0.2, 0, 77.8, 1.3, 0.4, 8.3, 3),
  flour_almond: makeProfile(571, 50, 3.9, 0, 21.6, 10.4, 4.4, 21.2, 1),
  sugar_granulated: makeProfile(387, 0, 0, 0, 100, 0, 100, 0, 1),
  sugar_brown: makeProfile(380, 0, 0, 0, 98.1, 0, 96.2, 0.1, 28),
  sugar_powdered: makeProfile(389, 0, 0, 0, 99.8, 0, 97.7, 0, 1),
  honey: makeProfile(304, 0, 0, 0, 82.4, 0.2, 82.1, 0.3, 4),
  maple_syrup: makeProfile(260, 0.1, 0, 0, 67, 0, 60.5, 0, 12),
  corn_syrup: makeProfile(286, 0, 0, 0, 77, 0, 77, 0, 18),
  molasses: makeProfile(290, 0.1, 0, 0, 74.7, 0, 74.7, 0, 37),
  cocoa_powder: makeProfile(228, 13.7, 8.1, 0, 57.9, 37, 1.8, 19.6, 21),
  chocolate_dark: makeProfile(546, 31, 19, 0, 61, 7, 48, 5, 20),
  chocolate_milk: makeProfile(535, 30.7, 18, 0.3, 58.4, 3.4, 52.8, 7.6, 79),
  vanilla_extract: makeProfile(288, 0.1, 0, 0, 12.7, 0, 12.7, 0, 9),
  water: makeProfile(0, 0, 0, 0, 0, 0, 0, 0, 1),
  butter_unsalted: makeProfile(717, 81, 51, 3.3, 0.1, 0, 0.1, 0.9, 11),
  margarine: makeProfile(717, 80, 20, 3, 0.7, 0, 0.7, 0.2, 720),
  oil_olive: makeProfile(884, 100, 14, 0, 0, 0, 0, 0, 2),
  oil_avocado: makeProfile(884, 100, 12, 0, 0, 0, 0, 0, 7),
  oil_canola: makeProfile(884, 100, 7, 0, 0, 0, 0, 0, 0),
  oil_vegetable: makeProfile(884, 100, 15, 0, 0, 0, 0, 0, 0),
  shortening: makeProfile(884, 100, 25, 12, 0, 0, 0, 0, 0),
  egg_whole: makeProfile(155, 10.6, 3.1, 0.1, 1.1, 0, 1.1, 12.6, 124),
  egg_yolk: makeProfile(322, 26.5, 9.6, 0.1, 3.6, 0, 3.6, 15.9, 48),
  egg_white: makeProfile(52, 0.2, 0, 0, 0.7, 0, 0.7, 10.9, 166),
  milk_whole: makeProfile(61, 3.3, 1.9, 0.1, 4.8, 0, 4.8, 3.2, 44),
  milk_2_percent: makeProfile(50, 2, 1.3, 0.1, 5, 0, 5, 3.4, 46),
  milk_skim: makeProfile(34, 0.1, 0.1, 0, 5, 0, 5, 3.4, 51),
  buttermilk: makeProfile(40, 1, 0.6, 0, 4.8, 0, 4.8, 3.3, 52),
  half_and_half: makeProfile(123, 10, 6.2, 0.4, 9.7, 0, 9.3, 3.5, 125),
  cream_heavy: makeProfile(340, 36, 23, 1.5, 2.8, 0, 2.8, 2.1, 40),
  yogurt_plain: makeProfile(59, 3.3, 2.1, 0.1, 4.7, 0, 4.7, 10, 36),
  sour_cream: makeProfile(214, 20, 12.4, 0.8, 4.6, 0, 3.4, 2.4, 52),
  cheese_cheddar: makeProfile(403, 33, 19, 1.1, 1.3, 0, 0.5, 24.9, 621),
  cheese_mozzarella: makeProfile(280, 17, 10, 0.7, 3.1, 0, 1.3, 28, 627),
  cheese_parmesan: makeProfile(431, 29, 19.6, 1.5, 4.1, 0, 0.9, 38, 1529),
  cheese_cream: makeProfile(342, 34, 21, 1.2, 4.1, 0, 3.2, 6, 321),
  cheese_goat: makeProfile(364, 30, 21, 0.8, 2.2, 0, 2.1, 22, 423),
  bacon: makeProfile(541, 42, 14.2, 1.4, 1.4, 0, 1.4, 37, 1717),
  ham: makeProfile(145, 5.5, 1.9, 0.1, 1.5, 0, 1.5, 21, 1200),
  chicken_breast: makeProfile(165, 3.6, 1, 0, 0, 0, 0, 31, 74),
  chicken_thigh: makeProfile(209, 11, 3.3, 0.1, 0, 0, 0, 26, 90),
  chicken_wing: makeProfile(203, 13, 3.7, 0.1, 0, 0, 0, 20, 87),
  turkey_ground: makeProfile(189, 10.4, 2.6, 0, 0, 0, 0, 22, 90),
  beef_ground_90: makeProfile(176, 10, 4.2, 0.5, 0, 0, 0, 20, 72),
  beef_ground_80: makeProfile(254, 17, 7, 1.1, 0, 0, 0, 26, 75),
  beef_steak: makeProfile(217, 12, 5, 0.6, 0, 0, 0, 26, 60),
  pork_loin: makeProfile(201, 12, 4.3, 0.1, 0, 0, 0, 22, 62),
  pork_belly: makeProfile(518, 53, 19, 0.2, 0, 0, 0, 9, 73),
  sausage_pork: makeProfile(301, 27, 9, 0.1, 1.7, 0, 1.4, 12, 795),
  lamb: makeProfile(294, 21, 9, 0.8, 0, 0, 0, 25, 72),
  venison: makeProfile(158, 3.2, 1.5, 0, 0, 0, 0, 30, 67),
  salmon: makeProfile(206, 13, 3.1, 0, 0, 0, 0, 20, 59),
  tuna: makeProfile(144, 0.5, 0.1, 0, 0, 0, 0, 23, 50),
  cod: makeProfile(82, 0.7, 0.1, 0, 0, 0, 0, 18, 54),
  shrimp: makeProfile(99, 0.3, 0.1, 0, 0.2, 0, 0.2, 24, 111),
  scallop: makeProfile(92, 0.8, 0.2, 0, 3.2, 0, 0, 18, 667),
  mussel: makeProfile(172, 4.5, 0.8, 0, 7.4, 0, 0, 24, 369),
  tofu_firm: makeProfile(144, 8.7, 1.3, 0, 3, 2.3, 0.6, 15.7, 14),
  tempeh: makeProfile(193, 10.8, 2.3, 0, 7.7, 1.4, 1.1, 20.3, 9),
  seitan: makeProfile(143, 2.3, 0.4, 0, 8.1, 0.6, 0.4, 25, 13),
  lentils_cooked: makeProfile(116, 0.4, 0.1, 0, 20.1, 7.9, 1.8, 9, 2),
  chickpeas_cooked: makeProfile(164, 2.6, 0.3, 0, 27.4, 7.6, 4.8, 8.9, 7),
  black_beans_cooked: makeProfile(132, 0.5, 0.1, 0, 23.7, 8.7, 0.3, 8.9, 1),
  kidney_beans_cooked: makeProfile(127, 0.5, 0.1, 0, 22.8, 6.4, 0.6, 8.7, 2),
  rice_white_cooked: makeProfile(130, 0.3, 0.1, 0, 28.2, 0.4, 0.1, 2.7, 1),
  rice_brown_cooked: makeProfile(123, 1, 0.3, 0, 25.6, 1.8, 0.4, 2.7, 4),
  quinoa_cooked: makeProfile(120, 1.9, 0.2, 0, 21.3, 2.8, 0.9, 4.4, 7),
  pasta_cooked: makeProfile(131, 1.1, 0.2, 0, 25, 1.3, 0.9, 5, 6),
  bread_white: makeProfile(266, 3.3, 0.8, 0.1, 49, 2.7, 5, 8.9, 490),
  bread_whole_wheat: makeProfile(247, 3.4, 0.7, 0.1, 43, 6, 6, 12, 430),
  tortilla_flour: makeProfile(310, 9.6, 2.6, 0.1, 49, 3.7, 3.7, 8.1, 810),
  tortilla_corn: makeProfile(218, 2.9, 0.4, 0, 45, 6.3, 1.2, 5.7, 15),
  oats_rolled: makeProfile(389, 6.9, 1.2, 0, 66.3, 10.6, 0.9, 16.9, 2),
  cereal_cornflakes: makeProfile(357, 0.4, 0.1, 0, 84.5, 3, 8.7, 7.5, 729),
  granola: makeProfile(471, 20, 3.4, 0, 64.7, 6.5, 24.3, 10, 273),
  potato_raw: makeProfile(77, 0.1, 0, 0, 17.6, 2.2, 0.8, 2, 7),
  potato_baked: makeProfile(93, 0.1, 0, 0, 21.2, 2.2, 1.2, 2.5, 72),
  sweet_potato: makeProfile(86, 0.1, 0, 0, 20.1, 3, 4.2, 1.6, 55),
  carrot: makeProfile(41, 0.2, 0, 0, 9.6, 2.8, 4.7, 0.9, 69),
  beet: makeProfile(43, 0.2, 0, 0, 9.6, 2.8, 6.8, 1.6, 78),
  corn: makeProfile(96, 1.5, 0.2, 0, 21, 2.4, 4.5, 3.4, 15),
  peas: makeProfile(81, 0.4, 0.1, 0, 14.5, 5.1, 5.7, 5.4, 5),
  broccoli: makeProfile(55, 0.6, 0.1, 0, 11.2, 3.8, 2.2, 3.7, 33),
  cauliflower: makeProfile(25, 0.3, 0, 0, 4.9, 2, 1.9, 1.9, 30),
  kale: makeProfile(49, 0.9, 0.1, 0, 8.8, 3.6, 2.3, 4.3, 38),
  spinach: makeProfile(23, 0.4, 0.1, 0, 3.6, 2.2, 0.4, 2.9, 79),
  lettuce_romaine: makeProfile(17, 0.3, 0, 0, 3.3, 2.1, 1.2, 1.2, 8),
  cabbage_green: makeProfile(25, 0.1, 0, 0, 5.8, 2.5, 3.2, 1.3, 18),
  onion: makeProfile(40, 0.1, 0, 0, 9.3, 1.7, 4.2, 1.1, 4),
  garlic: makeProfile(149, 0.5, 0.1, 0, 33, 2.1, 1, 6.4, 17),
  shallot: makeProfile(72, 0.1, 0, 0, 16.8, 3.2, 7.9, 2.5, 12),
  leek: makeProfile(61, 0.3, 0.1, 0, 14.2, 1.8, 3.9, 1.5, 20),
  scallion: makeProfile(32, 0.2, 0, 0, 7.3, 2.6, 2.3, 1.8, 16),
  cilantro: makeProfile(23, 0.5, 0, 0, 3.7, 2.8, 0.9, 2.1, 46),
  parsley_fresh: makeProfile(36, 0.8, 0.1, 0, 6.3, 3.3, 0.9, 3, 56),
  dill_fresh: makeProfile(43, 1.1, 0.1, 0, 7, 2.1, 0.5, 3.5, 61),
  basil_fresh: makeProfile(23, 0.6, 0.1, 0, 3.6, 1.6, 0.3, 3.2, 4),
  mint_fresh: makeProfile(44, 0.7, 0.2, 0, 8.4, 6.8, 0.3, 3.3, 31),
  celery: makeProfile(16, 0.2, 0, 0, 3, 1.6, 1.3, 0.7, 80),
  bell_pepper: makeProfile(26, 0.3, 0, 0, 6, 2.1, 4.2, 0.9, 2),
  jalapeno: makeProfile(29, 0.4, 0.1, 0, 6.5, 2.8, 4.1, 0.9, 3),
  tomato: makeProfile(18, 0.2, 0, 0, 3.9, 1.2, 2.6, 0.9, 5),
  cucumber: makeProfile(15, 0.1, 0, 0, 3.6, 0.5, 1.7, 0.7, 2),
  zucchini: makeProfile(17, 0.3, 0, 0, 3.1, 1, 2.5, 1.2, 8),
  eggplant: makeProfile(25, 0.2, 0, 0, 5.9, 3, 3.5, 1, 2),
  mushroom_white: makeProfile(22, 0.3, 0, 0, 3.3, 1, 2, 3.1, 5),
  mushroom_cremini: makeProfile(22, 0.3, 0, 0, 3.3, 1, 2, 3.1, 5),
  avocado: makeProfile(160, 14.7, 2.1, 0, 8.5, 6.7, 0.7, 2, 7),
  banana: makeProfile(89, 0.3, 0.1, 0, 22.8, 2.6, 12.2, 1.1, 1),
  apple: makeProfile(52, 0.2, 0, 0, 13.8, 2.4, 10.4, 0.3, 1),
  pear: makeProfile(57, 0.1, 0, 0, 15.2, 3.1, 9.8, 0.4, 1),
  orange: makeProfile(47, 0.1, 0, 0, 11.8, 2.4, 9.4, 0.9, 0),
  lemon: makeProfile(29, 0.3, 0, 0, 9.3, 2.8, 2.5, 1.1, 2),
  lime: makeProfile(30, 0.2, 0, 0, 10.5, 2.8, 1.7, 0.7, 2),
  pineapple: makeProfile(50, 0.1, 0, 0, 13.1, 1.4, 9.9, 0.5, 1),
  mango: makeProfile(60, 0.4, 0.1, 0, 15, 1.6, 13.7, 0.8, 1),
  strawberry: makeProfile(32, 0.3, 0, 0, 7.7, 2, 4.9, 0.7, 1),
  blueberry: makeProfile(57, 0.3, 0, 0, 14.5, 2.4, 9.7, 0.7, 1),
  raspberry: makeProfile(52, 0.7, 0, 0, 12, 6.5, 4.4, 1.2, 1),
  grape: makeProfile(69, 0.2, 0, 0, 18.1, 0.9, 15.5, 0.7, 2),
  watermelon: makeProfile(30, 0.2, 0, 0, 7.6, 0.4, 6.2, 0.6, 1),
  cranberry_dried: makeProfile(325, 1.4, 0.1, 0, 82, 5.3, 65, 0.4, 45),
  raisin: makeProfile(299, 0.5, 0.1, 0, 79.2, 4.5, 59.2, 3.1, 26),
  date: makeProfile(282, 0.4, 0, 0, 75, 8, 63, 2.5, 2),
  fig_dried: makeProfile(249, 0.9, 0.1, 0, 63.9, 9.8, 47.9, 3.3, 10),
  prune: makeProfile(240, 0.4, 0.1, 0, 63, 7.1, 38, 2.2, 2),
  almond: makeProfile(579, 49.9, 3.8, 0, 21.6, 12.5, 4.4, 21.2, 1),
  walnut: makeProfile(654, 65.2, 6.1, 0, 13.7, 6.7, 2.6, 15.2, 2),
  pecan: makeProfile(691, 72, 6.2, 0, 13.9, 9.6, 3.9, 9.2, 0),
  pistachio: makeProfile(562, 45.4, 5.6, 0, 27.2, 10.6, 7.8, 20.2, 1),
  cashew: makeProfile(553, 43.9, 7.8, 0, 30.2, 3.3, 5.9, 18.2, 12),
  peanut: makeProfile(567, 49.2, 6.3, 0, 16.1, 8.5, 4.7, 25.8, 18),
  peanut_butter: makeProfile(588, 50, 10, 0, 20, 6, 9, 25, 372),
  tahini: makeProfile(595, 53.8, 9.5, 0, 21.2, 9.3, 0.5, 17, 115),
  sunflower_seed: makeProfile(584, 51.5, 4.5, 0, 20, 8.6, 2.6, 20.8, 9),
  chia_seed: makeProfile(486, 30.7, 3.3, 0, 42.1, 34.4, 0, 16.5, 16),
  flax_seed: makeProfile(534, 42.2, 3.7, 0, 28.9, 27.3, 1.6, 18.3, 30),
  pumpkin_seed: makeProfile(559, 49, 8.7, 0, 10.7, 6, 1.4, 30, 7),
  coconut_shredded: makeProfile(660, 65, 57, 0, 24, 16, 7, 7, 35),
  coconut_milk: makeProfile(230, 24, 21, 0, 6, 2.2, 3.3, 2.3, 15),
  coconut_water: makeProfile(19, 0.2, 0, 0, 3.7, 1.1, 3.7, 0.7, 105),
  sugar_coconut: makeProfile(382, 0.2, 0, 0, 92, 2, 92, 0.7, 45),
  salt: makeProfile(0, 0, 0, 0, 0, 0, 0, 0, 38758),
  pepper_black: makeProfile(251, 3.3, 1.4, 0, 64, 25.3, 0.6, 10.4, 20),
  cumin_ground: makeProfile(375, 22.3, 1.5, 0, 44.2, 10.5, 2.3, 17.8, 168),
  coriander_ground: makeProfile(298, 17.8, 1, 0, 54.8, 41.9, 0, 12.4, 35),
  paprika: makeProfile(282, 12.9, 2.1, 0, 54, 34.9, 10.3, 14.1, 68),
  chili_powder: makeProfile(282, 14.3, 2.5, 0, 49, 34.8, 11.5, 12.5, 2860),
  cayenne: makeProfile(318, 17.3, 3.3, 0, 56.6, 27.2, 10.3, 12, 30),
  garlic_powder: makeProfile(331, 0.7, 0.2, 0, 72.7, 9, 2.6, 16.6, 60),
  onion_powder: makeProfile(341, 1, 0.2, 0, 79.1, 15, 6.6, 10, 55),
  cinnamon_ground: makeProfile(247, 1.2, 0.3, 0, 80.6, 53.1, 2.2, 4, 10),
  nutmeg: makeProfile(525, 36.3, 25.9, 0, 49.3, 20.8, 28.5, 5.8, 16),
  ginger_ground: makeProfile(335, 4.2, 2.6, 0, 70.8, 14.1, 3.4, 8.9, 27),
  turmeric: makeProfile(312, 3.3, 1.8, 0, 67.1, 22.7, 3.2, 9.7, 27),
  clove: makeProfile(323, 20.1, 5.4, 0, 61.2, 33.9, 2.4, 6, 277),
  cardamom: makeProfile(311, 6.7, 0.7, 0, 68.5, 28, 0, 10.8, 18),
  oregano_dried: makeProfile(265, 4.3, 1.6, 0, 68.9, 42.5, 4.1, 9, 25),
  thyme_dried: makeProfile(276, 7.4, 3, 0, 63.9, 37, 1.7, 9.1, 55),
  rosemary_dried: makeProfile(331, 15.2, 7, 0, 64.1, 42.6, 4.9, 4.9, 50),
  basil_dried: makeProfile(251, 3.2, 0.6, 0, 60, 37.7, 1.7, 23, 76),
  parsley_dried: makeProfile(292, 5.5, 0.8, 0, 50.6, 26.7, 7.3, 26.6, 452),
  dill_dried: makeProfile(253, 4.4, 1.1, 0, 55.2, 13.6, 0, 19.9, 2080),
  soy_sauce: makeProfile(53, 0.6, 0.1, 0, 4.9, 0.8, 0.4, 8.1, 5493),
  vinegar_white: makeProfile(21, 0, 0, 0, 0.4, 0, 0.4, 0, 5),
  vinegar_apple_cider: makeProfile(22, 0, 0, 0, 0.9, 0, 0.4, 0, 5),
  vinegar_rice: makeProfile(20, 0, 0, 0, 0.9, 0, 0.1, 0, 4),
  vinegar_balsamic: makeProfile(88, 0, 0, 0, 17, 0, 14, 0.5, 23),
  worcestershire_sauce: makeProfile(78, 0, 0, 0, 19, 0, 17, 0.8, 907),
  fish_sauce: makeProfile(35, 0, 0, 0, 4, 0, 4, 5, 7927),
  miso: makeProfile(199, 6, 1, 0, 26, 5.4, 6.2, 12, 3728),
  gochujang: makeProfile(191, 3.6, 0.5, 0, 35, 3.3, 16.7, 7.1, 2350),
  ketchup: makeProfile(112, 0.2, 0, 0, 25.8, 0.3, 22.8, 1.3, 907),
  mustard_yellow: makeProfile(66, 4.4, 0.2, 0, 5.3, 4, 1.9, 4.4, 1135),
  mayonnaise: makeProfile(680, 75, 11.7, 0.2, 0.6, 0, 0.6, 1, 635),
  bbq_sauce: makeProfile(165, 0.4, 0.1, 0, 38.9, 0.5, 33, 1.4, 910),
  hot_sauce: makeProfile(29, 0.5, 0.1, 0, 6.2, 0.5, 2.5, 1, 1100),
  vinaigrette: makeProfile(320, 30, 4, 0, 12, 0, 11, 1, 620),
  pesto: makeProfile(445, 43, 8, 0.1, 10, 2, 2, 6, 1040),
  hummus: makeProfile(264, 15, 2.1, 0, 23, 6, 1, 8, 562),
  salsa: makeProfile(36, 0.2, 0, 0, 8.3, 1.5, 3.9, 1.5, 430),
  guacamole: makeProfile(160, 14, 2, 0, 8.5, 6.7, 1.4, 2, 240),
  yogurt_greek_plain: makeProfile(97, 5, 3, 0, 3.6, 0, 3.6, 9, 47),
  ricotta_part_skim: makeProfile(174, 10, 6.4, 0.3, 6.4, 0, 0, 11.3, 84),
  mascarpone: makeProfile(435, 44, 29, 1.7, 3.9, 0, 3.9, 7.6, 45),
  creme_fraiche: makeProfile(455, 45, 28, 1.7, 4, 0, 4, 5.5, 46),
  gelatin: makeProfile(355, 0, 0, 0, 0, 0, 0, 85, 200),
  pectin: makeProfile(136, 0, 0, 0, 90, 90, 0, 0, 30),
  cornstarch: makeProfile(381, 0.1, 0, 0, 91, 0.9, 0.1, 0.3, 9),
  baking_powder: makeProfile(53, 0, 0, 0, 28, 0, 0, 0, 11453),
  baking_soda: makeProfile(0, 0, 0, 0, 0, 0, 0, 0, 1259),
  yeast_active_dry: makeProfile(325, 7.5, 1, 0, 41, 26, 13, 40, 30),
  gelatin_sheet: makeProfile(335, 0, 0, 0, 0, 0, 0, 85, 200),
  espresso_powder: makeProfile(2, 0, 0, 0, 0.4, 0, 0, 0.1, 2),
  coffee_brewed: makeProfile(1, 0, 0, 0, 0.2, 0, 0, 0.1, 1),
  tea_brewed: makeProfile(1, 0, 0, 0, 0.2, 0, 0.1, 0, 3),
  wine_red: makeProfile(85, 0, 0, 0, 2.6, 0, 0.6, 0.1, 4),
  wine_white: makeProfile(82, 0, 0, 0, 2.6, 0, 0.6, 0.1, 5),
  beer: makeProfile(43, 0, 0, 0, 3.6, 0, 0, 0.4, 4),
  vodka: makeProfile(231, 0, 0, 0, 0, 0, 0, 0, 0),
  rum: makeProfile(231, 0, 0, 0, 0, 0, 0, 0, 0),
  whiskey: makeProfile(250, 0, 0, 0, 0, 0, 0, 0, 0)
};
const UNIT_TO_GRAMS = {
  g: 1,
  "g.": 1,
  gram: 1,
  grams: 1,
  kg: 1e3,
  "kg.": 1e3,
  kilogram: 1e3,
  kilograms: 1e3,
  oz: 28.3495,
  "oz.": 28.3495,
  ounce: 28.3495,
  ounces: 28.3495,
  "fluid ounce": 29.5735,
  "fluid ounces": 29.5735,
  "fl oz": 29.5735,
  "fl.oz": 29.5735,
  floz: 29.5735,
  lb: 453.592,
  "lb.": 453.592,
  lbs: 453.592,
  "lbs.": 453.592,
  pound: 453.592,
  pounds: 453.592,
  ml: 1,
  "ml.": 1,
  milliliter: 1,
  milliliters: 1,
  litre: 1e3,
  liter: 1e3,
  liters: 1e3,
  litres: 1e3,
  l: 1e3,
  "l.": 1e3,
  ltr: 1e3,
  dl: 100,
  cl: 10,
  tsp: 4.2,
  teaspoon: 4.2,
  teaspoons: 4.2,
  "tsp.": 4.2,
  tbsp: 14.3,
  tablespoon: 14.3,
  tablespoons: 14.3,
  "tbsp.": 14.3,
  tbl: 14.3,
  tbls: 14.3,
  cup: 240,
  "cup.": 240,
  cups: 240,
  c: 240,
  pt: 473.176,
  "pt.": 473.176,
  pint: 473.176,
  pints: 473.176,
  qt: 946.353,
  "qt.": 946.353,
  qts: 946.353,
  quart: 946.353,
  quarts: 946.353,
  gal: 3785.41,
  "gal.": 3785.41,
  gallon: 3785.41,
  gallons: 3785.41,
  each: 0,
  ea: 0,
  "ea.": 0,
  pkg: 0,
  package: 0,
  pack: 0
};
const EACH_WEIGHT_G = {
  egg_whole: 50,
  egg_white: 30,
  egg_yolk: 18,
  potato_raw: 213,
  potato_baked: 213,
  sweet_potato: 200,
  carrot: 61,
  onion: 110,
  garlic: 3,
  shallot: 30,
  tomato: 120,
  bell_pepper: 120,
  jalapeno: 14,
  mushroom_white: 18,
  mushroom_cremini: 20,
  zucchini: 196,
  cucumber: 300,
  apple: 182,
  pear: 178,
  orange: 131,
  lemon: 65,
  lime: 67,
  banana: 118,
  avocado: 200,
  peach: 150,
  plum: 66,
  apricot: 35,
  strawberry: 12,
  grape: 5,
  shrimp: 12,
  scallop: 35,
  mussel: 24,
  chicken_breast: 174,
  chicken_thigh: 135,
  chicken_wing: 80,
  turkey_ground: 113,
  beef_ground_90: 113,
  beef_ground_80: 113,
  beef_steak: 227,
  pork_loin: 200,
  salmon: 170,
  cod: 170,
  tofu_firm: 126,
  bread_white: 28,
  bread_whole_wheat: 28,
  tortilla_flour: 45,
  tortilla_corn: 28,
  cookie: 12,
  brownie: 40
};
const DENSITY_CUP_G = {
  flour_all_purpose: 120,
  flour_bread: 127,
  flour_cake: 118,
  flour_almond: 96,
  sugar_granulated: 200,
  sugar_brown: 220,
  sugar_powdered: 120,
  honey: 340,
  maple_syrup: 320,
  corn_syrup: 328,
  molasses: 340,
  cocoa_powder: 85,
  chocolate_dark: 170,
  chocolate_milk: 154,
  butter_unsalted: 227,
  oil_olive: 218,
  oil_canola: 218,
  oil_vegetable: 218,
  water: 240,
  buttermilk: 245,
  half_and_half: 240,
  vinegar_white: 240,
  vinegar_apple_cider: 240,
  vinegar_rice: 240,
  vinegar_balsamic: 264,
  worcestershire_sauce: 252,
  peanut_butter: 258,
  almond: 143,
  walnut: 100,
  pecan: 108,
  cashew: 137,
  pistachio: 123,
  peanut: 146,
  sunflower_seed: 140,
  chia_seed: 140,
  flax_seed: 168,
  oats_rolled: 90,
  rice_white_cooked: 195,
  rice_brown_cooked: 195,
  quinoa_cooked: 170,
  pasta_cooked: 140,
  lentils_cooked: 198,
  chickpeas_cooked: 240,
  black_beans_cooked: 172,
  kidney_beans_cooked: 177,
  corn: 145,
  peas: 145,
  spinach: 30,
  cilantro: 16,
  parsley_fresh: 30,
  dill_fresh: 24,
  basil_fresh: 21,
  mint_fresh: 24,
  scallion: 100,
  kale: 67,
  broccoli: 91,
  cauliflower: 107,
  carrot: 128,
  bell_pepper: 149,
  tomato: 149,
  cucumber: 133,
  strawberry: 150,
  blueberry: 148,
  raspberry: 123,
  raisin: 165,
  cranberry_dried: 110,
  date: 147,
  coconut_shredded: 96,
  coconut_milk: 226,
  cornstarch: 128,
  cocoa_powder_unsweet: 85,
  tofu_firm: 260,
  yogurt_plain: 245,
  yogurt_greek_plain: 240,
  sour_cream: 240,
  creme_fraiche: 240,
  mascarpone: 240,
  ricotta_part_skim: 246,
  hummus: 240,
  salsa: 240,
  guacamole: 240,
  pesto: 240
};
const STOP_WORDS = /* @__PURE__ */ new Set([
  "fresh",
  "large",
  "small",
  "medium",
  "organic",
  "free-range",
  "free",
  "range",
  "skinless",
  "boneless",
  "trimmed",
  "ground",
  "minced",
  "chopped",
  "diced",
  "sliced",
  "peeled",
  "grated",
  "shredded",
  "whole",
  "raw",
  "cooked",
  "roasted",
  "toasted",
  "unsalted",
  "salted",
  "low",
  "fat",
  "reduced",
  "sodium",
  "light",
  "packed",
  "drained",
  "rinsed",
  "taste",
  "plus",
  "extra",
  "virgin",
  "double",
  "heavy",
  "dark",
  "fine",
  "granulated",
  "coarse",
  "powdered",
  "confectioners",
  "brown",
  "white",
  "red",
  "yellow",
  "green",
  "black",
  "skin-on",
  "skin",
  "on",
  "seeded",
  "seedless",
  "baby",
  "stalks",
  "leaves",
  "sprigs",
  "bunch",
  "bunches",
  "fillet",
  "fillets",
  "loin",
  "steak",
  "cut",
  "pieces",
  "piece",
  "half",
  "halves",
  "uncooked",
  "thawed",
  "frozen",
  "split",
  "with",
  "without",
  "shell",
  "shells",
  "heads",
  "head",
  "tail",
  "tails",
  "rib",
  "ribs",
  "sticks",
  "stick",
  "sheet",
  "sheets",
  "package",
  "packages",
  "bag",
  "bags",
  "can",
  "cans",
  "jar",
  "jars",
  "clove",
  "cloves",
  "brand",
  "style",
  "original",
  "classic",
  "premium",
  "quality",
  "grade",
  "recipe",
  "base",
  "blend",
  "prepared",
  "instant",
  "mix",
  "unsweetened",
  "sweetened",
  "natural",
  "house",
  "signature"
]);
const INGREDIENT_SYNONYMS = [
  [/\ball[-\s]?purpose flour\b|\bap flour\b/i, "flour_all_purpose"],
  [/\bbread flour\b/i, "flour_bread"],
  [/\bcake flour\b/i, "flour_cake"],
  [/\balmond flour\b/i, "flour_almond"],
  [/\bgranulated sugar\b|\bwhite sugar\b|\bsugar\b/i, "sugar_granulated"],
  [/\bbrown sugar\b/i, "sugar_brown"],
  [/\bpowdered sugar\b|\bconfectioners'? sugar\b/i, "sugar_powdered"],
  [/\bhoney\b/i, "honey"],
  [/\bmaple syrup\b/i, "maple_syrup"],
  [/\bcorn syrup\b|\bglucose syrup\b/i, "corn_syrup"],
  [/\bmolasses\b/i, "molasses"],
  [/\bunsweetened cocoa powder\b|\bcocoa powder\b\b/i, "cocoa_powder"],
  [/\bdark chocolate\b/i, "chocolate_dark"],
  [/\bmilk chocolate\b/i, "chocolate_milk"],
  [/\bvanilla extract\b/i, "vanilla_extract"],
  [/\bwater\b|\bice water\b|\bfiltered water\b/i, "water"],
  [/\bunsalted butter\b|\bbutter\b/i, "butter_unsalted"],
  [/\bmargarine\b/i, "margarine"],
  [/\bextra virgin olive oil\b|\bolive oil\b/i, "oil_olive"],
  [/\bavocado oil\b/i, "oil_avocado"],
  [/\bcanola oil\b/i, "oil_canola"],
  [/\bvegetable oil\b|\bneutral oil\b/i, "oil_vegetable"],
  [/\bshortening\b/i, "shortening"],
  [/\bwhole egg\b|\beggs?\b/i, "egg_whole"],
  [/\begg whites?\b/i, "egg_white"],
  [/\begg yolks?\b/i, "egg_yolk"],
  [/\bwhole milk\b|\bmilk\b/i, "milk_whole"],
  [/\b2% milk\b|\breduced fat milk\b/i, "milk_2_percent"],
  [/\bskim milk\b|\bfat free milk\b/i, "milk_skim"],
  [/\bbuttermilk\b/i, "buttermilk"],
  [/\bhalf[-\s]?and[-\s]?half\b/i, "half_and_half"],
  [/\bheavy cream\b|\bwhipping cream\b/i, "cream_heavy"],
  [/\bplain yogurt\b/i, "yogurt_plain"],
  [/\bsour cream\b/i, "sour_cream"],
  [/\bcheddar cheese\b/i, "cheese_cheddar"],
  [/\bmozzarella\b/i, "cheese_mozzarella"],
  [/\bparmesan\b/i, "cheese_parmesan"],
  [/\bcream cheese\b/i, "cheese_cream"],
  [/\bgoat cheese\b|\bchèvre\b/i, "cheese_goat"],
  [/\bbacon\b/i, "bacon"],
  [/\bham\b/i, "ham"],
  [/\bchicken breast\b/i, "chicken_breast"],
  [/\bchicken thighs?\b/i, "chicken_thigh"],
  [/\bchicken wings?\b/i, "chicken_wing"],
  [/\bground turkey\b/i, "turkey_ground"],
  [/\b90% lean ground beef\b|\bground beef\b/i, "beef_ground_90"],
  [/\b80% lean ground beef\b/i, "beef_ground_80"],
  [/\bbeef steaks?\b|\bstrip steak\b|\bribeye\b|\bsteak\b/i, "beef_steak"],
  [/\bpork loin\b|\bcenter cut pork\b/i, "pork_loin"],
  [/\bpork belly\b/i, "pork_belly"],
  [/\bpork sausage\b/i, "sausage_pork"],
  [/\blamb\b/i, "lamb"],
  [/\bvenison\b/i, "venison"],
  [/\bsalmon\b/i, "salmon"],
  [/\btuna\b/i, "tuna"],
  [/\bcod\b/i, "cod"],
  [/\bshrimp\b|\bprawns?\b/i, "shrimp"],
  [/\bscallops?\b/i, "scallop"],
  [/\bmussels?\b/i, "mussel"],
  [/\bfirm tofu\b|\btofu\b/i, "tofu_firm"],
  [/\btempeh\b/i, "tempeh"],
  [/\bseitan\b/i, "seitan"],
  [/\blentils?\b/i, "lentils_cooked"],
  [/\bchickpeas?\b|\bgarbanzo\b/i, "chickpeas_cooked"],
  [/\bblack beans\b/i, "black_beans_cooked"],
  [/\bkidney beans\b/i, "kidney_beans_cooked"],
  [/\bwhite rice\b/i, "rice_white_cooked"],
  [/\bbrown rice\b/i, "rice_brown_cooked"],
  [/\bquinoa\b/i, "quinoa_cooked"],
  [/\bcooked pasta\b|\bpasta\b/i, "pasta_cooked"],
  [/\bwhite bread\b/i, "bread_white"],
  [/\bwhole wheat bread\b/i, "bread_whole_wheat"],
  [/\bflour tortillas?\b/i, "tortilla_flour"],
  [/\bcorn tortillas?\b/i, "tortilla_corn"],
  [/\bro lled oats\b|\boats?\b/i, "oats_rolled"],
  [/\bgranola\b/i, "granola"],
  [/\bbaked potato\b/i, "potato_baked"],
  [/\bpotatoes?\b/i, "potato_raw"],
  [/\bsweet potatoes?\b|\byam\b/i, "sweet_potato"],
  [/\bcarrots?\b/i, "carrot"],
  [/\bbeets?\b/i, "beet"],
  [/\bcorn kernels?\b|\bcorn\b/i, "corn"],
  [/\bpeas\b/i, "peas"],
  [/\bbroccoli\b/i, "broccoli"],
  [/\bcauliflower\b/i, "cauliflower"],
  [/\bkale\b/i, "kale"],
  [/\bspinach\b/i, "spinach"],
  [/\bromaine\b|\blettuce\b/i, "lettuce_romaine"],
  [/\bcabbage\b/i, "cabbage_green"],
  [/\bonions?\b/i, "onion"],
  [/\bgarlic\b/i, "garlic"],
  [/\bshallots?\b/i, "shallot"],
  [/\bleeks?\b/i, "leek"],
  [/\bgreen onions?\b|\bscallions?\b|\bspring onions?\b/i, "scallion"],
  [/\bcelery\b/i, "celery"],
  [/\bcilantro\b|\bcoriander leaves?\b/i, "cilantro"],
  [/\b(bell|sweet) peppers?\b/i, "bell_pepper"],
  [/\bjalape(n|ñ)o\b/i, "jalapeno"],
  [/\btomatoes?\b/i, "tomato"],
  [/\bcucumbers?\b/i, "cucumber"],
  [/\bzucchini\b/i, "zucchini"],
  [/\beggplant\b|\baubergine\b/i, "eggplant"],
  [/\bmushrooms?\b|\bcremini\b|\bportobello\b/i, "mushroom_white"],
  [/\bavocado\b/i, "avocado"],
  [/\bbananas?\b/i, "banana"],
  [/\bapples?\b/i, "apple"],
  [/\bpears?\b/i, "pear"],
  [/\boranges?\b/i, "orange"],
  [/\blem ons?\b/i, "lemon"],
  [/\blimes?\b/i, "lime"],
  [/\bpineapple\b/i, "pineapple"],
  [/\bmango\b/i, "mango"],
  [/\bstrawberries?\b/i, "strawberry"],
  [/\bblueberries?\b/i, "blueberry"],
  [/\braspberries?\b/i, "raspberry"],
  [/\bgrapes?\b/i, "grape"],
  [/\bwatermelon\b/i, "watermelon"],
  [/\bdried cranberries?\b/i, "cranberry_dried"],
  [/\braisins?\b/i, "raisin"],
  [/\bdates?\b/i, "date"],
  [/\bfigs?\b/i, "fig_dried"],
  [/\bprunes?\b/i, "prune"],
  [/\balmonds?\b/i, "almond"],
  [/\bwalnuts?\b/i, "walnut"],
  [/\bpecans?\b/i, "pecan"],
  [/\bpistachios?\b/i, "pistachio"],
  [/\bcashews?\b/i, "cashew"],
  [/\bpeanuts?\b/i, "peanut"],
  [/\bpeanut butter\b/i, "peanut_butter"],
  [/\btahini\b/i, "tahini"],
  [/\bsunflower seeds?\b/i, "sunflower_seed"],
  [/\bchia seeds?\b/i, "chia_seed"],
  [/\bflax seeds?\b/i, "flax_seed"],
  [/\bpumpkin seeds?\b|\bpepitas\b/i, "pumpkin_seed"],
  [/\bshredded coconut\b/i, "coconut_shredded"],
  [/\bcoconut milk\b/i, "coconut_milk"],
  [/\bcoconut water\b/i, "coconut_water"],
  [/\bcoconut sugar\b/i, "sugar_coconut"],
  [/\bsalt\b|\bsea salt\b|\bkosher salt\b/i, "salt"],
  [/\bblack pepper\b|\bpepper\b/i, "pepper_black"],
  [/\bcumin\b/i, "cumin_ground"],
  [/\bcoriander\b/i, "coriander_ground"],
  [/\bpaprika\b/i, "paprika"],
  [/\bchili powder\b/i, "chili_powder"],
  [/\bcayenne\b/i, "cayenne"],
  [/\bgarlic powder\b/i, "garlic_powder"],
  [/\bonion powder\b/i, "onion_powder"],
  [/\bcinnamon\b/i, "cinnamon_ground"],
  [/\bnutmeg\b/i, "nutmeg"],
  [/\bginger\b/i, "ginger_ground"],
  [/\bturmeric\b/i, "turmeric"],
  [/\bcloves?\b/i, "clove"],
  [/\bcardamom\b/i, "cardamom"],
  [/\boregano\b/i, "oregano_dried"],
  [/\bthyme\b/i, "thyme_dried"],
  [/\brosemary\b/i, "rosemary_dried"],
  [/\bdried basil\b|\bbasil flakes\b/i, "basil_dried"],
  [/\bbasil\b/i, "basil_fresh"],
  [/\bdried parsley\b|\bparsley flakes\b/i, "parsley_dried"],
  [/\bparsley\b/i, "parsley_fresh"],
  [/\bdried dill\b|\bdill weed\b/i, "dill_dried"],
  [/\bdill\b/i, "dill_fresh"],
  [/\bmint leaves?\b|\bpeppermint\b|\bspearmint\b/i, "mint_fresh"],
  [/\bsoy sauce\b/i, "soy_sauce"],
  [/\bdistilled vinegar\b|\bwhite vinegar\b|\bspirit vinegar\b/i, "vinegar_white"],
  [/\bapple cider vinegar\b|\bacv\b/i, "vinegar_apple_cider"],
  [/\brice (?:wine )?vinegar\b/i, "vinegar_rice"],
  [/\bbalsamic vinegar\b/i, "vinegar_balsamic"],
  [/\bworcestershire\b/i, "worcestershire_sauce"],
  [/\bfish sauce\b/i, "fish_sauce"],
  [/\bmiso\b/i, "miso"],
  [/\bgochujang\b/i, "gochujang"],
  [/\bketchup\b/i, "ketchup"],
  [/\byellow mustard\b|\bmustard\b/i, "mustard_yellow"],
  [/\bmayonnaise\b|\baioli\b/i, "mayonnaise"],
  [/\bbbq sauce\b/i, "bbq_sauce"],
  [/\bhot sauce\b|\bsriracha\b/i, "hot_sauce"],
  [/\bvinaigrette\b/i, "vinaigrette"],
  [/\bpesto\b/i, "pesto"],
  [/\bhummus\b/i, "hummus"],
  [/\bsalsa\b/i, "salsa"],
  [/\bguacamole\b/i, "guacamole"],
  [/\bgreek yogurt\b/i, "yogurt_greek_plain"],
  [/\bricotta\b/i, "ricotta_part_skim"],
  [/\bmascarpone\b/i, "mascarpone"],
  [/\bcrème fraîche\b|\bcreme fraiche\b/i, "creme_fraiche"],
  [/\bgelatin\b/i, "gelatin"],
  [/\bpectin\b/i, "pectin"],
  [/\bcornstarch\b/i, "cornstarch"],
  [/\bbaking powder\b/i, "baking_powder"],
  [/\bbaking soda\b|\bbicarbonate\b/i, "baking_soda"],
  [/\byeast\b/i, "yeast_active_dry"],
  [/\bespresso powder\b|\binstant coffee\b/i, "espresso_powder"],
  [/\bcoffee\b/i, "coffee_brewed"],
  [/\btea\b/i, "tea_brewed"],
  [/\bred wine\b/i, "wine_red"],
  [/\bwhite wine\b/i, "wine_white"],
  [/\bbeer\b/i, "beer"],
  [/\bvodka\b/i, "vodka"],
  [/\brum\b/i, "rum"],
  [/\bwhiskey\b|\bbourbon\b/i, "whiskey"]
];
const ALL_KEYS = Object.keys(NUTRITION_DATABASE);
const KEY_TOKEN_CACHE = /* @__PURE__ */ new Map();
const NON_ALPHANUMERIC = /[^a-z0-9\s]/g;
function normalizeIngredientForMatching(raw) {
  if (!raw) return "";
  const ascii = raw.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  return ascii.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/[%®™]/g, " ").replace(/[\u2018\u2019]/g, "'").replace(/\bno\.\s*\d+\b/g, " ").replace(/\b\d+%/g, " ").replace(/\d+\s?(?:st|nd|rd|th)\b/g, " ").replace(/[-_/]/g, " ").replace(/\s+/g, " ").trim();
}
function tokenizeIngredient(normalized) {
  if (!normalized) return [];
  const cleaned = normalized.replace(NON_ALPHANUMERIC, " ");
  const tokens = cleaned.split(/\s+/).map((token) => token.trim()).filter((token) => token && !STOP_WORDS.has(token));
  return Array.from(new Set(tokens));
}
function getKeyTokens(key) {
  const cached = KEY_TOKEN_CACHE.get(key);
  if (cached) return cached;
  const tokens = key.split(/[_\s]+/).filter(Boolean);
  KEY_TOKEN_CACHE.set(key, tokens);
  return tokens;
}
function findBestTokenMatch(tokens) {
  if (!tokens.length) return null;
  const uniqueTokens = Array.from(new Set(tokens));
  let best = null;
  for (const key of ALL_KEYS) {
    const keyTokens = getKeyTokens(key);
    let directMatches = 0;
    let partialMatches = 0;
    for (const token of uniqueTokens) {
      if (keyTokens.includes(token)) {
        directMatches++;
      } else if (keyTokens.some(
        (keyToken) => keyToken.startsWith(token) || token.startsWith(keyToken)
      )) {
        partialMatches++;
      }
    }
    if (!directMatches && partialMatches <= 1) continue;
    const coverage = keyTokens.length ? directMatches / keyTokens.length : 0;
    const tokenCoverage = uniqueTokens.length ? directMatches / uniqueTokens.length : 0;
    const score = directMatches * 2 + partialMatches * 0.6 + coverage + tokenCoverage;
    if (!best || score > best.score) {
      const confidenceBase = 0.45 + coverage * 0.3 + tokenCoverage * 0.3 + (directMatches > 1 ? 0.12 : 0);
      best = {
        key,
        score,
        confidence: Number(Math.min(0.98, confidenceBase).toFixed(3))
      };
    }
  }
  if (best && best.score >= 1.4) {
    return best;
  }
  return null;
}
function resolveIngredientKey(raw) {
  const normalized = normalizeIngredientForMatching(raw);
  const textForRegex = normalized || raw.toLowerCase();
  for (const [pattern, key] of INGREDIENT_SYNONYMS) {
    if (pattern.test(textForRegex)) {
      return { key, normalized: key, confidence: 1 };
    }
  }
  const tokens = tokenizeIngredient(textForRegex);
  if (tokens.length) {
    const best = findBestTokenMatch(tokens);
    if (best) {
      return { key: best.key, normalized: best.key, confidence: best.confidence };
    }
  }
  const fallbackToken = tokens[0] ?? (normalized || raw.trim().toLowerCase());
  return { key: null, normalized: fallbackToken, confidence: 0 };
}
const TBSP_PER_CUP = 16;
const TSP_PER_TBSP = 3;
const COOKING_FALLBACKS = [
  { pattern: /fried|grill|roast|bake|sear|broil/, yieldFactor: 0.88 },
  { pattern: /poach|boil|simmer|stew|steam|blanch/, yieldFactor: 0.95 },
  { pattern: /.*/, yieldFactor: 0.92 }
];
const ZERO_MACROS = () => ({
  calories: 0,
  fat: 0,
  saturatedFat: 0,
  transFat: 0,
  carbs: 0,
  fiber: 0,
  sugars: 0,
  protein: 0,
  sodium: 0
});
const unicodeFractions = {
  "¼": "1/4",
  "½": "1/2",
  "¾": "3/4",
  "⅐": "1/7",
  "⅑": "1/9",
  "⅒": "1/10",
  "⅓": "1/3",
  "⅔": "2/3",
  "⅕": "1/5",
  "⅖": "2/5",
  "⅗": "3/5",
  "⅘": "4/5",
  "⅙": "1/6",
  "⅚": "5/6",
  "⅛": "1/8",
  "⅜": "3/8",
  "⅝": "5/8",
  "⅞": "7/8"
};
function parseIngredientLine(line) {
  let text = line.trim().replace(/[¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, (c) => unicodeFractions[c] ?? c);
  text = text.replace(/(\d)(\s*)(\d\/\d)/g, "$1 $3");
  const match = text.match(
    /^\s*([0-9]+(?:\.[0-9]+)?(?:\s+[0-9]+\/\d+)?|[0-9]+\/\d+)\s*([a-zA-Z\.\-]+)?\s*(.*)$/
    // quantity + optional unit + remainder
  );
  if (match) {
    const [_, quantityRaw, unitRaw = "", remainder] = match;
    let quantity = 0;
    const parts2 = quantityRaw.split(" ");
    if (parts2.length === 2 && /\d+\/\d+/.test(parts2[1])) {
      const [whole, fraction] = parts2;
      const [num, denom] = fraction.split("/").map(Number);
      quantity = Number(whole) + (denom ? num / denom : 0);
    } else if (/\d+\/\d+/.test(quantityRaw)) {
      const [num, denom] = quantityRaw.split("/").map(Number);
      quantity = denom ? num / denom : Number(quantityRaw);
    } else {
      quantity = Number(quantityRaw);
    }
    const unit = (unitRaw || "").toLowerCase();
    let item = remainder.trim();
    let prep = "";
    const commaIndex = item.indexOf(",");
    if (commaIndex >= 0) {
      prep = item.slice(commaIndex + 1).trim().toLowerCase();
      item = item.slice(0, commaIndex).trim();
    }
    const leadPrep = /^(chopped|diced|minced|sliced|grated|crushed|pureed|melted|softened|cubed|julienned|shredded|mashed)\s+(.*)$/i;
    const leadMatch = item.match(leadPrep);
    if (leadMatch) {
      prep = prep || leadMatch[1].toLowerCase();
      item = leadMatch[2].trim();
    }
    return {
      quantity,
      unit: unit || (quantity > 0 ? "each" : unit),
      item,
      prep
    };
  }
  const parts = line.split(",");
  if (parts.length > 1) {
    return {
      quantity: 1,
      unit: "each",
      item: parts[0].trim(),
      prep: parts.slice(1).join(",").trim().toLowerCase()
    };
  }
  return {
    quantity: 1,
    unit: "each",
    item: line.trim(),
    prep: ""
  };
}
const ALIAS_ORDER = INGREDIENT_SYNONYMS.map(([, key]) => key);
function estimateGrams(matchKey, unit, quantity) {
  const lowerUnit = unit.toLowerCase();
  if (!Number.isFinite(quantity) || quantity <= 0) return 0;
  const direct = UNIT_TO_GRAMS[lowerUnit];
  if (direct && direct > 0) {
    return quantity * direct;
  }
  if (matchKey) {
    if ((lowerUnit === "cup" || lowerUnit === "cups") && DENSITY_CUP_G[matchKey]) {
      return quantity * DENSITY_CUP_G[matchKey];
    }
    if ((lowerUnit === "tbsp" || lowerUnit === "tablespoon" || lowerUnit === "tablespoons" || lowerUnit === "tbsp.") && DENSITY_CUP_G[matchKey]) {
      return quantity * (DENSITY_CUP_G[matchKey] / TBSP_PER_CUP);
    }
    if ((lowerUnit === "tsp" || lowerUnit === "teaspoon" || lowerUnit === "teaspoons" || lowerUnit === "tsp.") && DENSITY_CUP_G[matchKey]) {
      return quantity * (DENSITY_CUP_G[matchKey] / (TBSP_PER_CUP * TSP_PER_TBSP));
    }
    if ((lowerUnit === "each" || lowerUnit === "ea") && EACH_WEIGHT_G[matchKey]) {
      return quantity * EACH_WEIGHT_G[matchKey];
    }
  }
  if (lowerUnit === "each" || lowerUnit === "ea") {
    return quantity * 30;
  }
  if (lowerUnit === "pinch" || lowerUnit === "dash") {
    return quantity * 0.5;
  }
  if (lowerUnit === "sprig" || lowerUnit === "sprigs") {
    return quantity * 2;
  }
  if (lowerUnit === "bunch" || lowerUnit === "bunches") {
    return quantity * 85;
  }
  return quantity * 28.3495;
}
function multiplyProfile(profile, grams) {
  const factor = grams / 100;
  return {
    calories: profile.calories * factor,
    fat: profile.fat * factor,
    saturatedFat: profile.saturatedFat * factor,
    transFat: profile.transFat * factor,
    carbs: profile.carbs * factor,
    fiber: profile.fiber * factor,
    sugars: profile.sugars * factor,
    protein: profile.protein * factor,
    sodium: profile.sodium * factor
  };
}
function addTotals(target, delta) {
  target.calories += delta.calories;
  target.fat += delta.fat;
  target.saturatedFat += delta.saturatedFat;
  target.transFat += delta.transFat;
  target.carbs += delta.carbs;
  target.fiber += delta.fiber;
  target.sugars += delta.sugars;
  target.protein += delta.protein;
  target.sodium += delta.sodium;
}
function scaleTotals(source, factor) {
  if (!Number.isFinite(factor) || factor <= 0) return ZERO_MACROS();
  return {
    calories: source.calories * factor,
    fat: source.fat * factor,
    saturatedFat: source.saturatedFat * factor,
    transFat: source.transFat * factor,
    carbs: source.carbs * factor,
    fiber: source.fiber * factor,
    sugars: source.sugars * factor,
    protein: source.protein * factor,
    sodium: source.sodium * factor
  };
}
function roundTotals(source) {
  return {
    calories: Math.round(source.calories),
    fat: Number(source.fat.toFixed(2)),
    saturatedFat: Number(source.saturatedFat.toFixed(2)),
    transFat: Number(source.transFat.toFixed(2)),
    carbs: Number(source.carbs.toFixed(2)),
    fiber: Number(source.fiber.toFixed(2)),
    sugars: Number(source.sugars.toFixed(2)),
    protein: Number(source.protein.toFixed(2)),
    sodium: Math.round(source.sodium)
  };
}
function computeYieldFactor(index, providedYields, ingredientKey, fallback) {
  const provided = providedYields[index];
  if (typeof provided === "number" && Number.isFinite(provided) && provided >= 0) {
    return Math.max(0, Math.min(1, provided / 100));
  }
  if (ingredientKey && /salt|spice|pepper|powder/.test(ingredientKey)) {
    return 1;
  }
  return fallback;
}
function inferFallbackYield(prepText) {
  const normalized = prepText.toLowerCase();
  for (const entry of COOKING_FALLBACKS) {
    if (entry.pattern.test(normalized)) return entry.yieldFactor;
  }
  return 0.92;
}
async function handleNutritionAnalyze(req, res) {
  try {
    const {
      ingr,
      yields = [],
      yieldQty = 1,
      yieldUnit = "SERVING",
      prepMethod = ""
    } = req.body;
    if (!Array.isArray(ingr) || !ingr.length) {
      return res.status(400).json({ error: "No ingredients provided" });
    }
    const fallbackYield = inferFallbackYield(prepMethod || "");
    const totals = ZERO_MACROS();
    let totalWeight = 0;
    let matchedWeight = 0;
    const breakdown = [];
    const unknown = [];
    for (let index = 0; index < ingr.length; index++) {
      const original = ingr[index] ?? "";
      const parsed = parseIngredientLine(original);
      const match = resolveIngredientKey(parsed.item);
      const matchKey = match.key;
      let gramsRaw = estimateGrams(matchKey, parsed.unit, parsed.quantity);
      const yieldFactor = computeYieldFactor(index, yields, matchKey, fallbackYield);
      const grams = gramsRaw * yieldFactor;
      totalWeight += grams;
      if (matchKey && NUTRITION_DATABASE[matchKey]) {
        matchedWeight += grams;
        const macros = multiplyProfile(NUTRITION_DATABASE[matchKey], grams);
        addTotals(totals, macros);
        breakdown.push({
          original,
          normalized: matchKey,
          matchKey,
          confidence: match.confidence,
          grams,
          rawGrams: gramsRaw,
          yieldFactor,
          macros: roundTotals(macros)
        });
      } else {
        breakdown.push({
          original,
          normalized: match.normalized,
          matchKey: null,
          confidence: match.confidence,
          grams,
          rawGrams: gramsRaw,
          yieldFactor,
          macros: ZERO_MACROS()
        });
        unknown.push({
          original,
          suggestion: suggestClosestMatch(match.normalized)
        });
      }
    }
    const servings = Number.isFinite(yieldQty) && yieldQty > 0 ? yieldQty : 1;
    const perServing = scaleTotals(totals, 1 / servings);
    const per100g = totalWeight > 0 ? scaleTotals(totals, 100 / totalWeight) : ZERO_MACROS();
    const totalNutrients = {
      ENERC_KCAL: {
        label: "Energy",
        quantity: totals.calories,
        unit: "kcal"
      },
      FAT: {
        label: "Total Fat",
        quantity: totals.fat,
        unit: "g"
      },
      FASAT: {
        label: "Saturated Fat",
        quantity: totals.saturatedFat,
        unit: "g"
      },
      FATRN: {
        label: "Trans Fat",
        quantity: totals.transFat,
        unit: "g"
      },
      CHOCDF: {
        label: "Total Carbohydrate",
        quantity: totals.carbs,
        unit: "g"
      },
      FIBTG: {
        label: "Dietary Fiber",
        quantity: totals.fiber,
        unit: "g"
      },
      SUGAR: {
        label: "Sugars",
        quantity: totals.sugars,
        unit: "g"
      },
      PROCNT: {
        label: "Protein",
        quantity: totals.protein,
        unit: "g"
      },
      NA: {
        label: "Sodium",
        quantity: totals.sodium,
        unit: "mg"
      }
    };
    const response = {
      calories: Math.round(totals.calories),
      totals: roundTotals(totals),
      perServing: roundTotals(perServing),
      per100g: roundTotals(per100g),
      totalNutrients,
      totalWeight,
      matchedWeight,
      coverage: totalWeight > 0 ? matchedWeight / totalWeight : 0,
      yieldQty: servings,
      yieldUnit,
      breakdown,
      unknown
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error?.message || "Nutrition analysis failed" });
  }
}
function suggestClosestMatch(normalized) {
  if (!normalized) return "";
  const tokens = normalized.split(/\s+/).map((token) => token.trim()).filter((token) => token && !STOP_WORDS.has(token));
  for (const token of tokens) {
    const aliasIndex = ALIAS_ORDER.findIndex((key) => key.includes(token));
    if (aliasIndex >= 0) return ALIAS_ORDER[aliasIndex] || "";
  }
  return tokens[0] || normalized;
}
function decodeHtml(s) {
  return s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
function toAbsoluteUrl(possiblyRelative, base) {
  try {
    return new URL(possiblyRelative, base).toString();
  } catch {
    return possiblyRelative;
  }
}
function normalizeImageField(img) {
  if (!img) return null;
  if (typeof img === "string") return img;
  if (Array.isArray(img)) return normalizeImageField(img[0]);
  if (typeof img === "object") {
    if (typeof img.url === "string") return img.url;
    if (typeof img.contentUrl === "string") return img.contentUrl;
  }
  return null;
}
function parseJsonLdRecipe(html) {
  const scripts = Array.from(
    html.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    )
  );
  const safeArray = (v) => Array.isArray(v) ? v : v ? [v] : [];
  for (const m of scripts) {
    try {
      const raw = m[1].trim();
      const data = JSON.parse(raw);
      const list = Array.isArray(data) ? data : [data];
      for (const entry of list) {
        if (!entry) continue;
        const graphArr = safeArray(entry["@graph"]);
        const lookupById = {};
        for (const g of graphArr)
          if (g && typeof g === "object" && typeof g["@id"] === "string")
            lookupById[g["@id"]] = g;
        const candidates = graphArr.length ? graphArr : [entry];
        for (const cand of candidates) {
          const type = safeArray(cand["@type"]);
          if (type.includes("Recipe")) {
            const isoToHuman = (iso) => {
              if (!iso || typeof iso !== "string") return "";
              const m2 = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/i);
              if (!m2) return String(iso);
              const h = Number(m2[1] || 0), min = Number(m2[2] || 0);
              return h ? `${h}:${String(min).padStart(2, "0")}` : `${min}m`;
            };
            const normalizeInstructions = (ri) => {
              const arr = safeArray(ri);
              const out = [];
              for (const step of arr) {
                if (typeof step === "string") out.push(step);
                else if (step && typeof step.text === "string")
                  out.push(step.text);
                else if (step && Array.isArray(step.itemListElement)) {
                  for (const el of step.itemListElement) {
                    if (typeof el === "string") out.push(el);
                    else if (el && typeof el.text === "string")
                      out.push(el.text);
                  }
                }
              }
              return out.join("\n");
            };
            const nutrition = cand.nutrition ? {
              calories: String(cand.nutrition.calories || ""),
              fat: String(cand.nutrition.fatContent || ""),
              carbs: String(cand.nutrition.carbohydrateContent || ""),
              protein: String(cand.nutrition.proteinContent || ""),
              servingSize: String(cand.nutrition.servingSize || "")
            } : void 0;
            let image = normalizeImageField(cand.image);
            if (!image && cand.image && typeof cand.image === "object" && typeof cand.image["@id"] === "string") {
              const ref = lookupById[cand.image["@id"]];
              image = normalizeImageField(ref);
            }
            return {
              title: decodeHtml(String(cand.name || "")),
              ingredients: safeArray(cand.recipeIngredient || []).map(
                (x) => decodeHtml(String(x))
              ),
              instructions: decodeHtml(
                normalizeInstructions(cand.recipeInstructions).trim()
              ),
              yield: decodeHtml(String(cand.recipeYield || "")),
              cookTime: isoToHuman(
                String(cand.cookTime || cand.totalTime || "")
              ),
              prepTime: isoToHuman(String(cand.prepTime || "")),
              image,
              nutrition
            };
          }
        }
      }
    } catch {
    }
  }
  return null;
}
function scrapeRecipeFallback(html) {
  const pick = (re) => (html.match(re)?.[1] || "").trim();
  const title = decodeHtml(pick(/<title[^>]*>([\s\S]*?)<\/title>/i)) || decodeHtml(pick(/<h1[^>]*>([\s\S]*?)<\/h1>/i));
  const ogImage = pick(
    /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["'][^>]*>/i
  ) || pick(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i
  ) || pick(
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i
  ) || pick(/<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["'][^>]*>/i) || pick(/<meta[^>]+name=["']image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  const section = (label) => {
    const h = html.match(
      new RegExp(`<h[1-6][^>]*>\\s*${label.source}[\\s\\S]*?<\\/h[1-6]>`, "i")
    );
    if (!h) return "";
    const idx = h.index + h[0].length;
    const tail = html.slice(idx);
    const next = tail.search(/<h[1-6][^>]*>/i);
    return next >= 0 ? tail.slice(0, next) : tail;
  };
  const extractList = (frag) => {
    const lis = Array.from(frag.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)).map((m) => decodeHtml(m[1].replace(/<[^>]+>/g, "").trim())).filter(Boolean);
    if (lis.length) return lis;
    const ps = Array.from(frag.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)).map((m) => decodeHtml(m[1].replace(/<[^>]+>/g, "").trim())).filter(Boolean);
    return ps;
  };
  const ingFrag = section(/ingredients?/i);
  const insFrag = section(/(instructions|directions|method|steps)/i);
  const ingredients = extractList(ingFrag);
  const instructions = extractList(insFrag);
  const yieldText = pick(/<[^>]*>(?:yield|servings?)\s*:?\s*([^<]{1,40})<\//i);
  if (!title && ingredients.length === 0 && instructions.length === 0)
    return null;
  return {
    title,
    ingredients,
    instructions: instructions.join("\n"),
    yield: yieldText,
    image: ogImage
  };
}
async function handleRecipeImport(req, res) {
  try {
    const { url } = req.body;
    if (!url || !/^https?:\/\//i.test(url))
      return res.status(400).json({ error: "Invalid url" });
    const r = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 RecipeStudioBot" }
    });
    if (!r.ok)
      return res.status(400).json({ error: `Fetch failed (${r.status})` });
    const html = await r.text();
    const rec = parseJsonLdRecipe(html) || scrapeRecipeFallback(html);
    if (!rec) return res.status(404).json({ error: "No recipe found on page" });
    if (rec.image) {
      rec.image = toAbsoluteUrl(String(rec.image), url);
    }
    res.json(rec);
  } catch (e) {
    res.status(500).json({ error: e?.message || "Import failed" });
  }
}
async function proxyRecipeImage(req, res) {
  try {
    const src = String(req.query.url || "");
    if (!src || !/^https?:\/\//i.test(src)) {
      return res.status(400).json({ error: "Invalid image url" });
    }
    const r = await fetch(src, {
      headers: { Accept: "image/*,application/octet-stream" }
    });
    if (!r.ok) {
      return res.status(400).json({ error: `Image fetch failed (${r.status})` });
    }
    const ct = r.headers.get("content-type") || "application/octet-stream";
    if (!/^image\//i.test(ct)) {
      return res.status(415).json({ error: "Not an image" });
    }
    const ab = await r.arrayBuffer();
    res.setHeader("content-type", ct);
    res.setHeader("cache-control", "public, max-age=31536000, immutable");
    res.end(Buffer.from(ab));
  } catch (e) {
    res.status(500).json({ error: e?.message || "Proxy failed" });
  }
}
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.get("/api/github/raw", githubRaw);
  app2.get("/api/github/zip", githubZip);
  app2.post("/api/nutrition/analyze", handleNutritionAnalyze);
  app2.post("/api/recipe/import", handleRecipeImport);
  app2.get("/api/recipe/image", proxyRecipeImage);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
