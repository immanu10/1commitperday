import { auth } from "./auth";
import { SignOut, SignIn } from "./components/buttons";
import { CommitBox } from "./components/commit-box";
import { getTodaysCommitInfo } from "./lib/api";

export default async function Home() {
  const session = await auth();
  const contributionData = await getTodaysCommitInfo(session);

  return (
    <>
      <div className="h-16 flex items-center justify-between">
        <div>
          <h1 className="font-medium text-lg inline-flex">#1commitperday</h1>
          {session && (
            <span className="text-sm text-slate-500 ml-1">
              <span className="text-xl">/</span>
              <span>{session.user.username}</span>
            </span>
          )}
        </div>

        {session ? <SignOut /> : <SignIn />}
      </div>
      <div className="mt-24">
        {session ? (
          <CommitBox data={contributionData} />
        ) : (
          <div className="bg-[#101217] h-64 w-full flex items-center justify-center px-2">
            <p className="text-white text-lg text-center">
              {"Sign in to view your today's commit"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
