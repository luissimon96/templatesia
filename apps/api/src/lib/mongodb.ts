import { MongoClient, Db } from 'mongodb';
import { env } from '../config';
import logger from '../utils/logger';

const uri = env.MONGO_URI;
const dbName = 'templatebuilderia';

interface MongoConnection {
  client: MongoClient;
  db: Db;
}

// Variável global para armazenar a conexão entre recarregamentos (desenvolvimento)
let cachedConnection: MongoConnection | null = null;

export async function connectToDatabase(): Promise<MongoConnection> {
  // Se já temos uma conexão, retorná-la
  if (cachedConnection) {
    logger.debug('🔄 Usando conexão MongoDB em cache');
    return cachedConnection;
  }

  logger.info('🔌 Conectando ao MongoDB...');

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);

    // Verificar se a conexão está funcionando
    await db.command({ ping: 1 });
    logger.info('✅ Conexão com MongoDB estabelecida com sucesso');

    // Armazenar a conexão em cache
    cachedConnection = { client, db };
    return cachedConnection;
  } catch (error) {
    logger.error('❌ Falha ao conectar com MongoDB:', error);
    throw error;
  }
} 