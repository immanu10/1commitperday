import { Session } from "next-auth";

type APIRes = {
  data: {
    viewer: {
      login: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              contributionLevel:
                | "NONE"
                | "FIRST_QUARTILE"
                | "SECOND_QUARTILE"
                | "THIRD_QUARTILE"
                | "FOURTH_QUARTILE";
              date: string;
              contributionCount: number;
            }[];
          }[];
        };
      };
    };
  };
};

export async function getTodaysCommitInfo(session: Session | null) {
  if (session === null) return null;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify({
      query: `query getTodaysContribution($from: DateTime!, $to: DateTime!){
          viewer {
            login
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionLevel
                    date
                    contributionCount
                  }
                }    
              }
            }
          }
        }
      `,
      variables: {
        from: new Date(
          Date.UTC(new Date().getUTCFullYear(), 0, 1, 0, 0, 0, 0)
        ).toISOString(),
        to: new Date().toISOString().split("T")[0] + "T00:00:00.000Z",
      },
    }),
  });
  const { data } = (await res.json()) as APIRes;
  const weeksLength =
    data.viewer.contributionsCollection.contributionCalendar.weeks.length;
  const contributionDaysLength =
    data.viewer.contributionsCollection.contributionCalendar.weeks[
      weeksLength - 1
    ].contributionDays.length;

  const contributionLevel =
    data.viewer.contributionsCollection.contributionCalendar.weeks[
      weeksLength - 1
    ].contributionDays[contributionDaysLength - 1].contributionLevel;
  const totalContribution =
    data.viewer.contributionsCollection.contributionCalendar.weeks[
      weeksLength - 1
    ].contributionDays[contributionDaysLength - 1].contributionCount;
  const date =
    data.viewer.contributionsCollection.contributionCalendar.weeks[
      weeksLength - 1
    ].contributionDays[contributionDaysLength - 1].date;

  const username = data.viewer.login;

  return {
    username,
    contributionLevel,
    totalContribution,
    date: new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }),
  };
}

export type canvasData = {
  username: string;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
  totalContribution: number;
  date: string;
};
