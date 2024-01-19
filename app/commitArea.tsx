import { Session } from "next-auth";
import { CommitCard } from "./commitCard";
import { getTodaysCommitInfo } from "./lib/api";

export async function CommitArea({ session }: { session: Session }) {
  const data = await getTodaysCommitInfo(session);

  return <CommitCard data={data} />;
}
