import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../components/GitHubGridWrapper.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

async function loadDays(fetch, token = "test-token") {
  const exports = {};
  const context = vm.createContext({
    exports, fetch, process: { env: token ? { GITHUB_TOKEN: token } : {} },
    AbortSignal, Date, console: { error() {} },
    require: (name) => name === "react/jsx-runtime"
      ? { jsx: (_component, props) => props }
      : { default: () => null },
  });
  vm.runInContext(compiled, context);
  const result = await exports.default();
  return JSON.parse(JSON.stringify(result.initialContributions));
}

test("GraphQL activity levels survive seasonal and normal palettes", async () => {
  const levels = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"];
  for (const colors of [
    ["#ebedf0", "#ffee4a", "#ffc501", "#fe9600", "#03001c"],
    ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  ]) {
    const days = levels.map((contributionLevel, i) => ({
      date: `2026-10-${String(20 + i)}`, contributionCount: i * 3,
      contributionLevel, color: colors[i],
    }));
    let query;
    const actual = await loadDays(async (url, options) => {
      assert.equal(url, "https://api.github.com/graphql");
      query = JSON.parse(options.body).query;
      return { ok: true, json: async () => ({ data: { user: { contributionsCollection: {
        contributionCalendar: { weeks: [{ contributionDays: days }] },
      } } } }) };
    });
    assert.deepEqual(actual, days.map((day, level) => ({ date: day.date, count: day.contributionCount, level })));
    assert.match(query, /\bcontributionLevel\b/);
  }
});

test("public fallback keeps activity levels and chronological order without a token", async () => {
  const days = [
    { date: "2026-10-31", count: 4, level: 2 },
    { date: "2026-10-30", count: 0, level: 0 },
  ];
  const result = await loadDays(async (url) => {
    assert.match(url, /^https:\/\/github-contributions-api\.jogruber\.de\//);
    return { ok: true, json: async () => ({ contributions: days }) };
  }, "");
  assert.deepEqual(result, [...days].reverse());
});

test("a failed authenticated request still uses the public fallback", async () => {
  const days = [{ date: "2026-10-31", count: 4, level: 2 }];
  const calls = [];
  const result = await loadDays(async (url) => {
    calls.push(url);
    if (url === "https://api.github.com/graphql") return { ok: false, status: 401 };
    return { ok: true, json: async () => ({ contributions: days }) };
  });
  assert.equal(calls.length, 2);
  assert.deepEqual(result, days);
});
