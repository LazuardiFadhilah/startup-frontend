import CredentialsProvider from "@auth/core/providers/credentials";
import { useRuntimeConfig } from "#imports";
const config = useRuntimeConfig();
const apiBase = config.public.API_BASE;
export default defineAuthConfig({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await $fetch(`${apiBase}/sessions`, {
            method: "POST",
            body: credentials,
          });

          if (res && res.token) {
            return {
              id: res.user.id,
              name: res.user.name,
              email: res.user.email,
              token: res.token,
            };
          }
        } catch (error) {
          console.error("Login error:", error);
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.token = token.token;
      }
      return session;
    },
  },
});
