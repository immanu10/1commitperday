import { Suspense } from "react";
import { auth } from "./auth";
import { SignIn, SignOut } from "./buttons";
import { CommitArea } from "./commitArea";

export default async function Home() {
  const session = await auth();

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
          <CommitArea session={session} />
        ) : (
          <div className="bg-[#101217] h-64 w-full flex items-center justify-center px-2">
            <p className="text-white text-lg text-center">
              {"Sign in to view your today's commit"}
            </p>
          </div>
        )}
      </div>
      <div className="h-4"></div>
    </>
  );
}

function LoadingSkelton() {
  return (
    <div className="h-72 w-full bg-[#101217] px-12 py-8 space-y-6">
      <div className="flex justify-between animate-pulse">
        <div className="bg-[#161b22] h-6 w-28 rounded-lg"></div>
        <div className="bg-[#161b22] h-6 w-28 rounded-lg"></div>
      </div>
      <div className="flex space-x-6 animate-pulse">
        <div className="bg-[#161b22] h-44 w-44 rounded-xl"></div>
        <div className="flex flex-col justify-between animate-pulse">
          <div className="bg-[#161b22] h-16 w-8 rounded-lg"></div>
          <div className="space-y-2">
            <div className="bg-[#161b22] h-6 w-44 rounded-sm"></div>
            <div className="bg-[#161b22] h-6 w-28 rounded-sm"></div>
          </div>
          <div className="bg-[#161b22] h-4 w-24 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}
