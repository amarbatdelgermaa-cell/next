
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // Vercel-ийн AUTH_SECRET хувьсагчийг ашиглана
  secret: process.env.AUTH_SECRET,

  // Нэвтрэх хуудас
  pages: {
    signIn: '/login',
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const logged = !!auth?.user;
      const dashboard = nextUrl.pathname.startsWith('/dashboard');

      if (dashboard) return logged;

      if (logged && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
