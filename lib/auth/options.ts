import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { routes } from "@/lib/routes";

import { prisma } from "../db";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: routes.login,
  },
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: {
          label: "כתובת אימייל",
          type: "email",
          placeholder: "name@example.com",
        },
        password: {
          label: "סיסמה",
          type: "password",
        },
      },
      async authorize(rawCredentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(rawCredentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user?.hashedPassword) {
          return null;
        }

        const match = await compare(password, user.hashedPassword);
        if (!match) {
          return null;
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.name = user.name;
      }

      return session;
    },
  },
  events: {
    async createUser({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { email: user.email?.toLowerCase() },
      });
    },
  },
  trustHost: true,
};
