import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../prisma-client";
import type { Profile, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Account, User } from "@prisma/client";

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
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.firstName + " " + user.lastName; // Assuming user has firstName and lastName fields
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
        };
      }

      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async signIn({ user, account, profile }: { user: User; account: Account | null; profile: Profile }) {
      // If the user doesn't have an email, we can't proceed
      if (!user.email) return false;

      //Find user in database
      const userData = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
        include: { accounts: true },
      });

      //User doesn't exist in database, needs to be added manually
      if (!userData) {
        console.log("User not found in database, creating new user");
        return false;
      }

      //User exists in database, check if account is already linked, if not create a new account
      if (account && !userData.accounts.some((a) => a.provider === "google")) {
        console.log("Creating new account for user");
        const result = await prisma.account.create({
          data: {
            userId: userData.id,
            type: "oauth",
            provider: "google",
            providerAccountId: `${profile.sub}`,
          },
        });
        if (!result) {
          console.error("Failed to create account for user");
          return false;
        }
        return true;
      }
      return true;
    },
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`, // Changed from __Secure prefix
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false, // Disable in development, enable in production
        domain: process.env.NODE_ENV === "development" ? "localhost" : ".yourdomain.com",
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
  debug: process.env.NODE_ENV === "development",
  logger: {
    error(code: unknown, metadata: unknown) {
      console.error("🛑 NEXT-AUTH ERROR:", code, metadata);
    },
    warn(code: unknown) {
      console.warn("⚠️ NEXT-AUTH WARNING:", code);
    },
    debug(code: unknown, metadata: unknown) {
      console.log("🐛 NEXT-AUTH DEBUG:", code, metadata);
    },
  },
};
