import { NextResponse } from "next/server";

const USERNAME = "Camila-Navas";
const CACHE_SECONDS = 3600;

export const revalidate = 3600;

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitHubContributionsResponse = {
  username: string;
  totalContributions: number;
  weeks: ContributionDay[][];
  rangeStart: string;
  rangeEnd: string;
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

type GraphqlResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
            }>;
          }>;
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
};

function levelFor(count: number): ContributionDay["level"] {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      {
        error:
          "GITHUB_TOKEN no configurado. El heatmap de contribuciones requiere un token con permisos read:user.",
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: USERNAME },
      }),
      next: { revalidate: CACHE_SECONDS },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "GitHub GraphQL devolvio un error" },
        { status: 502 }
      );
    }

    const json = (await res.json()) as GraphqlResponse;
    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(
        { error: "Respuesta inesperada de GitHub" },
        { status: 502 }
      );
    }

    const weeks: ContributionDay[][] = calendar.weeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: levelFor(d.contributionCount),
      }))
    );

    const flat = weeks.flat();
    const rangeStart = flat[0]?.date ?? "";
    const rangeEnd = flat[flat.length - 1]?.date ?? "";

    const payload: GitHubContributionsResponse = {
      username: USERNAME,
      totalContributions: calendar.totalContributions,
      weeks,
      rangeStart,
      rangeEnd,
    };

    return NextResponse.json(payload);
  } catch (err) {
    console.error("[github-contributions] Error:", err);
    return NextResponse.json(
      { error: "Error al obtener el heatmap de contribuciones" },
      { status: 500 }
    );
  }
}
