import { PrismaClient } from '@prisma/client';

export * from '@prisma/client';

// Exportando uma instância do PrismaClient
export const prisma = new PrismaClient();

// Função para conectar ao banco de dados
export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('🔌 Conectado ao banco de dados');
    return prisma;
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
    throw error;
  }
};

// Função para desconectar do banco de dados
export const disconnectFromDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log('🔌 Desconectado do banco de dados');
  } catch (error) {
    console.error('❌ Erro ao desconectar do banco de dados:', error);
    throw error;
  }
}; 