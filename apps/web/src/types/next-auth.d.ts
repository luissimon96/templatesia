import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Estendendo a interface User do NextAuth
   */
  interface User {
    id: string;
    name: string;
    email: string;
    isAdmin?: boolean;
  }

  /**
   * Estendendo a interface Session do NextAuth
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      isAdmin?: boolean;
    };
  }
}

declare module 'next-auth/jwt' {
  /**
   * Estendendo a interface JWT do NextAuth
   */
  interface JWT {
    id: string;
    isAdmin?: boolean;
  }
} 