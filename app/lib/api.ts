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
            }[];
          }[];
        };
      };
    };
  };
};

export async function getTodaysCommitInfo(session: Session) {
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
                  }
                }    
              }
            }
          }
        }
      `,
      variables: {
        from: new Date().toISOString().split("T")[0] + "T00:00:00Z",
        to: new Date().toISOString().split("T")[0] + "T23:59:59Z",
      },
    }),
  });
  const { data } = (await res.json()) as APIRes;
  const contributionLevel =
    data.viewer.contributionsCollection.contributionCalendar.weeks[0]
      .contributionDays[0].contributionLevel;
  const totalContribution =
    data.viewer.contributionsCollection.contributionCalendar.totalContributions;
  const date =
    data.viewer.contributionsCollection.contributionCalendar.weeks[0]
      .contributionDays[0].date;

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

export type canvasData = Awaited<ReturnType<typeof getTodaysCommitInfo>>;