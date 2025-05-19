import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Update interface to match Django backend roles
declare module "next-auth" {
  interface User {
    role?: string
    token?: string
    refreshToken?: string
  }
  interface Session {
    user: User & {
      role?: string
    }
    token?: string
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Connect to Django backend login endpoint
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          });
          
          if (!response.ok) {
            console.error("Login failed:", await response.text());
            return null;
          }
          
          const data = await response.json();
          console.log("Login response:", data);
          
          // Return user with tokens from Django
          return {
            id: data.user?.id?.toString() || "1",
            email: data.user?.email || credentials?.email,
            name: data.user?.name || data.user?.email || credentials?.email,
            role: data.user?.role || "user",
            token: data.access || data.token,
            refreshToken: data.refresh
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Pass tokens and role from authorize to token
      if (user) {
        token.role = user.role;
        token.accessToken = user.token;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass tokens and role from token to session
      if (session?.user) {
        session.user.role = token.role as string | undefined;
        session.token = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
})

export { handler as GET, handler as POST }
