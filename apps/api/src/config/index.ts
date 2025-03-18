import { z } from 'zod';
import * as dotenv from 'dotenv-flow';
import logger from '../utils/logger';

// Carrega as variáveis de ambiente
dotenv.config();

// Schema de validação
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  MONGO_URI: z
    .string()
    .refine(val => val.startsWith('mongodb://') || val.startsWith('mongodb+srv://'), {
      message: 'MONGO_URI deve começar com mongodb:// ou mongodb+srv://'
    }),
  JWT_SECRET: z.string().min(1, { message: 'JWT_SECRET é obrigatório' }),
  JWT_EXPIRATION: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
});

// Função para validar e obter as variáveis de ambiente
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    logger.error('❌ Configuração de ambiente inválida:', error);
    throw new Error(`Configuração inválida: ${error.message}`);
  }
}

// Exportar as variáveis de ambiente validadas
export const env = validateEnv();

// Log de inicialização
logger.info(`🔧 Ambiente carregado: ${env.NODE_ENV}`);
logger.debug('📊 Configuração:', {
  PORT: env.PORT,
  MONGO_URI: env.MONGO_URI.substring(0, 20) + '...',
  CORS_ORIGIN: env.CORS_ORIGIN
}); 