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

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("GitHub API request failed:", res.status);
      return [];
    }

    const json = await res.json();
    const calendar =
      json?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      console.error("Malformed GitHub API response");
      return [];
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
    return [];
  }
}

export default async function GitHubGridWrapper() {
  const contributions = await getContributions();
  return <GitHubGrid initialContributions={contributions} />;
}