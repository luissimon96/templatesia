import { MongoClient } from 'mongodb';
import { env } from './config';
import { logger } from './logger';

const uri = env.get('MONGO_URI');
const options = {};

if (!uri) {
  throw new Error(
    'Por favor, defina a variável de ambiente MONGO_URI no arquivo .env.local'
  );
}

// Verificar se a URI está no formato correto
if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
  throw new Error('MONGO_URI deve começar com mongodb:// ou mongodb+srv://');
}

let client;
let clientPromise: Promise<MongoClient>;

if (env.isDevelopment()) {
  // Em desenvolvimento, use uma variável global para manter a conexão
  // entre recarregamentos da página
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().catch(err => {
      logger.error('Falha ao conectar ao MongoDB', err);
      throw err;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Em produção, é melhor ter uma nova instância do MongoClient
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch(err => {
    logger.error('Falha ao conectar ao MongoDB', err);
    throw err;
  });
}

// Função auxiliar para obter a conexão com o banco de dados
export async function getDatabase(dbName = 'templatebuilderia') {
  try {
    const client = await clientPromise;
    return client.db(dbName);
  } catch (error) {
    logger.error('Erro ao obter conexão com o banco de dados', error as Error);
    throw error;
  }
}

// Função auxiliar para executar operações no MongoDB com tratamento de erros
export async function executeMongoOperation(operation: Function) {
  try {
    return await operation();
  } catch (error) {
    logger.error('Erro na operação MongoDB', error as Error);
    throw error;
  }
}

// Log ao inicializar o módulo
logger.info('Módulo MongoDB inicializado');

// Exportar o promise do cliente para uso em compartilhado no aplicativo
export default clientPromise; 