import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string | null;
    username?: string | null;
  }
}
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      accessToken?: string | null;
      username?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account && profile && account.access_token) {
        token.accessToken = account.access_token;
        token.username = (profile as any).login;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.accessToken = token.accessToken;
      session.user.username = token.username;
      return session;
    },
  },
};

export const auth = () => getServerSession(authOptions);
