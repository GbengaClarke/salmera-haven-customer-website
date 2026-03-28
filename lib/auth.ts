import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import LinkedIn from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUser, getUser } from "./dataApi";
import { supabase } from "./supabase";

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
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const creds = credentials as Record<"email" | "password", string>;

        if (!credentials?.email || !credentials?.password) return null;

        // Manually verify the email/password through supabasew
        const { data, error } = await supabase.auth.signInWithPassword({
          email: creds.email,
          password: creds.password,
        });

        if (error || !data.user) {
          throw new Error("Invalid email or password");
        }

        // user data saved into JWT/Session by nextauth
        return {
          email: data.user.email,
          name: data.user.user_metadata?.full_name,
          image: "",
        };
      },
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
