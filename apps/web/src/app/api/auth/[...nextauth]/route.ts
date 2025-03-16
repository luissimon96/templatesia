import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { compare } from 'bcrypt';

// Simulação de banco de dados de usuários
const users = new Map();

// Função para verificar credenciais
async function verifyCredentials(email: string, password: string) {
  // Verificar se o usuário existe na simulação de banco de dados
  const user = users.get(email);

  if (!user) {
    // Em produção, não revele que o usuário não existe
    return null;
  }

  // Verificar se a senha está correta
  try {
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return null;
    }

    // Retornar o usuário sem a senha
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.error('Erro ao verificar senha:', error);
    return null;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Verificar credenciais
          const user = await verifyCredentials(
            credentials.email,
            credentials.password
          );

          return user;
        } catch (error) {
          console.error('Erro na autenticação:', error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
    newUser: '/signup',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

// Adicionar usuário à simulação de banco de dados quando registrado
// Isso é apenas para demonstração, em produção use um banco de dados real
export async function addUser(user: { id: string; name: string; email: string; password: string }) {
  users.set(user.email, user);
  return user;
} 