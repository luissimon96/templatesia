import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { join } from 'path';

/**
 * Módulo de configuração para carregar e validar variáveis de ambiente
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      // Carrega o .env da raiz ou do diretório atual
      envFilePath: [
        join(process.cwd(), '.env'),
        join(process.cwd(), '..', '..', '.env'),
      ],
      // Variáveis de ambiente sobrescrevem o arquivo .env
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      // Define se variáveis expandidas devem ser carregadas
      expandVariables: true,
      // Validação de variáveis de ambiente
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().default('7d'),
        CORS_ORIGIN: Joi.string().default('*'),
      }),
      // Se deve lançar erro ao falhar a validação
      validationOptions: {
        abortEarly: true,
      },
      // Disponibiliza variáveis globalmente
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {} 