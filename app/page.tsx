import { auth } from "./auth";
import { SignIn, SignOut } from "./buttons";
import { CommitArea } from "./commitArea";

export default async function Home() {
  const session = await auth();

  return (
    <main className="max-w-2xl h-full flex flex-col mx-auto px-4 md:px-0">
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
      <div className="mt-16 flex-1">
        {/* {session ? (
          <CommitArea session={session} />
        ) : ( */}
        <div className="">
          <div className="mx-auto w-64 h-64 border rounded-lg bg-[#ebedf0]"></div>
          <p className="text-center my-2">
            {"Sign in to view your today's commit"}
          </p>
        </div>
        {/* )} */}
      </div>
    </main>
  );
}
