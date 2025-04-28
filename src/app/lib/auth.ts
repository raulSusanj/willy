import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../prisma-client";
import type { Profile, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Account } from "@prisma/client";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // AzureAD({
    //   clientId: process.env.AZURE_AD_CLIENT_ID,
    //   clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    //   tenantId: process.env.AZURE_AD_TENANT_ID,
    // }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          role: "employee",
        };
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async signIn(data: any, account: Account, profile: Profile) {
      console.log("THIS IS THE USER");
      const { user } = data;

      if (!user.email) {
        return false;
      }

      const userData = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
        include: { accounts: true },
      });
      if (!userData) {
        return false;
      }
      console.log({ profile });
      if (account && !userData.accounts.some((a) => a.provider === "google")) {
        const result = await prisma.account.create({
          data: {
            userId: userData.id,
            type: "oauth",
            provider: "google",
            providerAccountId: `${profile.sub}`,
          },
        });
        // console.log({ result });
        if (!result) {
          return false;
        }
        return true;
      }
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/signin",
  },
};
