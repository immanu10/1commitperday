import { clsx } from "clsx";
import { Session } from "next-auth";

const CL = {
  NONE: "#ebedf0",
  FIRST_QUARTILE: "#9be9a8",
  SECOND_QUARTILE: "#40c463",
  THIRD_QUARTILE: "#30a14e",
  FOURTH_QUARTILE: "#216e39",
} as const;

type APIRes = {
  data: {
    viewer: {
      login: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              contributionLevel: keyof typeof CL;
            }[];
          }[];
        };
      };
    };
  };
};

export async function CommitBox({ session }: { session: Session }) {
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
  const color = CL[contributionLevel];

  return (
    <div>
      <div
        className={clsx(
          "mx-auto w-64 h-64 max-w-lg border rounded-lg",
          `bg-[${color}]`
        )}
      ></div>
      <div>
        <p>
          {totalContribution === 0
            ? "You have not made any contribution today, Come back later when you contribute to get your sharebale image"
            : "Congratzzz!, You have completed today's Challenge. Keep going!"}
        </p>
      </div>
    </div>
  );
}
