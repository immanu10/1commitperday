import { auth } from "./auth";
import { SignIn, SignOut } from "./buttons";
import { CommitArea } from "./commitArea";

export default async function Home() {
  const session = await auth();

  return (
    <main className="max-w-2xl h-full min-h-screen flex flex-col mx-auto px-4 md:px-0">
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
      <div className="mt-24 flex-1">
        {session ? (
          <CommitArea session={session} />
        ) : (
          <div className="bg-[#101217] h-64 w-full flex items-center justify-center">
            <p className="text-white text-lg">
              {"Sign in to view your today's commit"}
            </p>
          </div>
        )}
      </div>
      <div className="py-2 border-t">
        <p className="text-center text-xs leading-loose text-slate-600 space-x-2">
          Made with ❤️ by{" "}
          <a
            href={""}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline"
          >
            @immanu10
          </a>
          <span>|</span>
          <a
            href={""}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline"
          >
            Github
          </a>
        </p>
      </div>
    </main>
  );
}
