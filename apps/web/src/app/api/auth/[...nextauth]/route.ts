import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { compare } from 'bcrypt';
import { MongoClient } from 'mongodb';

// Conexão com o MongoDB
const uri = process.env.MONGO_URI || '';
// Verificar se a string começa com mongodb:// ou mongodb+srv://
if (uri && (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://'))) {
  console.error('Erro na string de conexão: formato inválido');
  console.error('MONGO_URI deve começar com mongodb:// ou mongodb+srv://');
  console.error('Atual:', uri.substring(0, 20));
}
console.log('MONGO_URI nextauth:', typeof uri, uri ? `${uri.substring(0, 20)}...${uri.substring(uri.length - 20)}` : 'não definido');
const dbName = 'templatebuilderia'; // Nome do banco de dados

// Função para verificar credenciais
async function verifyCredentials(email: string, password: string) {
  // Verificar se a URI está definida
  if (!uri) {
    console.error('URI de conexão do MongoDB não definida');
    return null;
  }

  let client;
  try {
    console.log('Tentando conectar ao MongoDB...');
    client = new MongoClient(uri);
    await client.connect();
    console.log('Conexão bem-sucedida com MongoDB');
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Buscar usuário pelo email
    console.log(`Buscando usuário com email: ${email}`);
    const user = await usersCollection.findOne({ email });

    if (!user) {
      console.log('Usuário não encontrado');
      return null;
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      console.log('Senha incorreta');
      return null;
    }

    console.log('Autenticação bem-sucedida');
    // Retornar o usuário sem a senha
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.error('Erro ao verificar senha:', error);
    return null;
  } finally {
    if (client) {
      await client.close();
    }
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

// Adicionar usuário à coleção de usuários
export async function addUser(user: { name: string; email: string; password: string }) {
  // Verificar se a URI está definida
  if (!uri) {
    console.error('URI de conexão do MongoDB não definida');
    throw new Error('URI de conexão do MongoDB não definida');
  }

  let client;
  try {
    console.log('Tentando adicionar usuário ao MongoDB...');
    client = new MongoClient(uri);
    await client.connect();
    console.log('Conexão bem-sucedida para adicionar usuário');
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    const result = await usersCollection.insertOne({
      ...user,
      photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`,
      isAdmin: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('Usuário adicionado com sucesso');

    return {
      id: result.insertedId.toString(),
      ...user,
    };
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
} 