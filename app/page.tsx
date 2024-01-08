import { auth } from "./auth";
import { SignIn, SignOut } from "./buttons";

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <main className="max-w-xl flex flex-col  container mx-auto my-4">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-xl">#1commitperday</h1>
        {session ? <SignOut /> : <SignIn />}
      </div>
      <div className="mx-auto my-24 w-64 h-64 max-w-lg border border-gray-200 rounded-lg bg-green-600"></div>
      <p className="text-center">
        Congratzzz! You Completed todays 1 Commit per day challenge. Keep going.
      </p>
    </main>
  );
}
