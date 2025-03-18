import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { env } from './config';
import logger from './utils/logger';

async function bootstrap() {
  try {
    // Criar a aplicação NestJS
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug'],
    });

    // Configurar middlewares de segurança
    app.use(helmet());
    app.use(compression());

    // Habilitar CORS
    app.enableCors({
      origin: env.CORS_ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    });

    // Configurar validação global
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }));

    // Configurar Swagger
    const config = new DocumentBuilder()
      .setTitle('Templatesia API')
      .setDescription('API para a plataforma Templatesia')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // Iniciar o servidor
    await app.listen(env.PORT);
    logger.info(`🚀 Servidor iniciado em http://localhost:${env.PORT}`);
    logger.info(`📚 Documentação Swagger disponível em http://localhost:${env.PORT}/docs`);
  } catch (error) {
    logger.error('❌ Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

bootstrap().catch(err => {
  logger.error('❌ Erro fatal:', err);
  process.exit(1);
}); 