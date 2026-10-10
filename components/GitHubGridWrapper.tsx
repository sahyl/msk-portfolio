import GitHubGrid from "./GitHubGrid";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GraphQLDay {
  date: string;
  contributionCount: number;
  color: string;
}

const GITHUB_USERNAME = "sahyl";
const PALETTE = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

function levelFromColor(color: string): number {
  const idx = PALETTE.indexOf(color.toLowerCase());
  return idx === -1 ? 0 : idx;
}

async function getContributions(): Promise<ContributionDay[]> {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  if (process.env.GITHUB_TOKEN) {
    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } }),
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        console.error("GitHub API request failed:", res.status);
        throw new Error(`GitHub API request failed: ${res.status}`);
      }

      const json = await res.json();
      const calendar =
        json?.data?.user?.contributionsCollection?.contributionCalendar;

      if (!calendar) {
        console.error("Malformed GitHub API response");
        throw new Error("Malformed GitHub API response");
      }

      return calendar.weeks.flatMap((week: { contributionDays: GraphQLDay[] }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: levelFromColor(day.color),
        }))
      );
    } catch (err) {
      console.error("Failed to fetch GitHub contributions:", err);
    }
  }

  // Public activity only; no token required. Keep this on the server and cache
  // it to avoid a third-party request from every visitor's browser.
  try {
    const year = new Date().getFullYear();
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${year}`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(10000) },
    );
    if (!res.ok) throw new Error(`Public activity request failed: ${res.status}`);
    const json: { contributions?: unknown } = await res.json();
    if (!Array.isArray(json.contributions) || json.contributions.length === 0) {
      throw new Error("Public activity response contains no contribution days");
    }
    return json.contributions.map((day: unknown): ContributionDay => {
      if (typeof day !== "object" || day === null) throw new Error("Invalid contribution day");
      const value = day as Record<string, unknown>;
      if (
        typeof value.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value.date) ||
        typeof value.count !== "number" || !Number.isInteger(value.count) || value.count < 0 ||
        typeof value.level !== "number" || !Number.isInteger(value.level) || value.level < 0 || value.level > 4
      ) throw new Error("Invalid public contribution data");
      return { date: value.date, count: value.count, level: value.level };
    }).sort((a, b) => a.date.localeCompare(b.date));
  } catch (err) {
    console.error("Failed to fetch public GitHub activity:", err);
    return [];
  }
}

export default async function GitHubGridWrapper() {
  const contributions = await getContributions();
  return <GitHubGrid initialContributions={contributions} />;
}
