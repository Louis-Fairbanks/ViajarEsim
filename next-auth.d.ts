import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    nombre: string;
    email: string;
    access?: string;
  }

  interface Session {
    user: User;
    accessToken?: string;
    provider?: string;
    access?: string;
  }
}

declare module "next-auth/jwt" {
    interface JWT {
      id?: string;
      access?: string;
      accessToken?: string;
      provider?: string;
    }
  }