import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {

      const { email } = user;

      const existingUser = await prisma.user.findUnique({
        where: {
          email: email!,
        },
      });
      if (!existingUser) {

        if (!email || !profile) {
          return false;
        }

        const user = await prisma.user.create({
          data: {
            email: email,
            name: profile.name,
          },
        });

        await prisma.resume.create({
          data: {
            userId: user.id,
            subdomain: profile.name?.split(" ").join("-").toLowerCase() ?? "",
            name: profile.name ?? "",
            initials: profile.name?.split(" ").map((n) => n[0]).join("") ?? "",
            tel: "",
            location: "",
            locationLink: "",
            about: "",
            summary: "",
            avatarUrl: profile.image ?? "",
            personalWebsiteUrl: "",
            email: email,
            linkedin: "",
            github: "",
            twitter: "",
            skills: [],
          }
        });
      }
      return true;
    }
  }
};
