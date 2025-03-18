import { createHash } from 'crypto';

// Simulação de banco de dados de usuários
export const users = new Map();

// Função simples para hash de senha (apenas para demonstração)
// Em produção, use bcrypt ou argon2
export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

// Função simples para verificar senha (apenas para demonstração)
// Em produção, use bcrypt ou argon2
export function verifyPassword(plaintext: string, hash: string): boolean {
  const hashedPlaintext = hashPassword(plaintext);
  return hashedPlaintext === hash;
}

// Função para adicionar usuário à simulação de banco de dados quando registrado
// Isso é apenas para demonstração, em produção use um banco de dados real
export async function addUser(user: { id: string; name: string; email: string; password: string }) {
  users.set(user.email, user);
  return user;
}

// Função para verificar credenciais
export async function verifyCredentials(email: string, password: string) {
  // Verificar se o usuário existe na simulação de banco de dados
  const user = users.get(email);

  if (!user) {
    // Em produção, não revele que o usuário não existe
    return null;
  }

  // Verificar se a senha está correta
  try {
    const passwordMatch = verifyPassword(password, user.password);

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