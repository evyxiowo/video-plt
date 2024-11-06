import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prismadb from "@/lib/prismadb";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    Credentials({
      id: "credentials",
      name: "Credentials", 
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check for missing email or password
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Find the user by email in the database
        const user = await prismadb.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid email or password"); // Generic error for security
        }

        // Verify password using bcrypt's compare function
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        // Authentication successful - return the user object
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/auth", // Redirect to this custom sign-in page if unauthorized
  },
  debug: process.env.NODE_ENV === "development", 
  adapter: PrismaAdapter(prismadb), // Use Prisma adapter for database integration
  session: {
    strategy: "jwt", // Use JWT-based session management
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET, 
  },
  secret: process.env.NEXTAUTH_SECRET, // Required for hashing and encryption
});
