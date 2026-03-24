import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import LinkedIn from "next-auth/providers/linkedin";
import { createUser, getUser } from "./dataApi";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }): Promise<boolean> {
      if (!user.email) return false;
      try {
        const normalizedEmail = user.email.trim().toLowerCase();

        const existingUser = await getUser(normalizedEmail);

        if (!existingUser) {
          createUser({ fullName: user.name!, email: user.email });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
  pages: { signIn: "/login" },
});
