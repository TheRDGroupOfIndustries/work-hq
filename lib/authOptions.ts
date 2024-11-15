import {
  NextAuthOptions,
  User as NextAuthUser,
  Session as NextAuthSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToMongoDB from "@/utils/db";
import User, { UserDBTypes } from "@/models/User";
import { CustomUser } from "./types";
interface CustomToken extends Record<string, unknown> {
  user?: CustomUser;
}

interface CustomUserSession extends NextAuthSession {
  user: CustomUser;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_ID!,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_ID!,
      clientSecret: process.env.NEXTAUTH_GITHUB_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.NEXTAUTH_LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_LINKEDIN_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        phone_number: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectToMongoDB();

        try {
          const user = await User.findOne(
            credentials?.email
              ? { email: credentials.email }
              : { phone_number: credentials.phone_number }
          );
          if (!user) throw new Error("User isn't registered!");

          const isPasswordCorrect = await bcrypt.compare(
            credentials?.password,
            user?.password
          );
          if (isPasswordCorrect) {
            return user as NextAuthUser & UserDBTypes;
          }
          throw new Error("Incorrect password");
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authorization error");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "",
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true;

      if (
        account?.provider &&
        ["google", "github", "linkedin"].includes(account.provider)
      ) {
        try {
          await connectToMongoDB();
          const userExists = await User.findOne({ email: user?.email });

          if (userExists) {
            userExists.profile_image = user?.image;
            await userExists.save();
            if (userExists.auth_integrated.includes(account.provider)) {
              return userExists;
            }
            userExists.auth_integrated.push(account.provider);
            return await userExists.save();
          }

          if (!userExists) {
            const newUser = new User({
              first_name: user?.name?.split(" ")[0],
              last_name: user?.name?.split(" ")[1],
              email: user?.email,
              profile_image: user?.image,
              auth_integrated: [account.provider],
            });
            return await newUser.save();
          }
          return userExists;
        } catch (error) {
          console.log("Error storing user in the database:", error);
          return false;
        }
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user as CustomUser;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        await connectToMongoDB();

        const dbUser = await User.findOne(
          (token as CustomToken).user?.email
            ? { email: (token as CustomToken).user?.email }
            : { phone_number: (token as CustomToken).user?.phone_number }
        );

        if (dbUser) {
          session.user = dbUser as CustomUser;
        }
      }
      return session as CustomUserSession;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};
