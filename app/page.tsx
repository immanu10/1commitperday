import { auth } from "./auth";
import { SignIn, SignOut } from "./buttons";
import { CommitBox } from "./commitBox";

export default async function Home() {
  const session = await auth();

  return (
    <main className="max-w-xl flex flex-col  container mx-auto my-4 px-4 md:px-0">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-xl">#1commitperday</h1>
        {session ? <SignOut /> : <SignIn />}
      </div>
      <div className="my-16">
        {session ? (
          <CommitBox session={session} />
        ) : (
          <div className="">
            <div className="w-64 h-64 border border-gray-200 rounded-lg bg-[#ebedf0]"></div>
            <p>{"Sign in to view your today's commit"}</p>
          </div>
        )}
      </div>
    </main>
  );
}
