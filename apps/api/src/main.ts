import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, LogLevel } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  // Configurar níveis de log com base no ambiente
  const logLevels: LogLevel[] = ['error', 'warn'];
  if (process.env.NODE_ENV !== 'production') {
    logLevels.push('log', 'debug', 'verbose');
  }
  
  try {
    // Criar aplicação NestJS
    const app = await NestFactory.create(AppModule, {
      logger: logLevels,
    });
    
    // Obter serviço de configuração
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 3000);
    const environment = configService.get<string>('NODE_ENV', 'development');
    const corsOrigin = configService.get<string>('CORS_ORIGIN', '*');
    
    // Mostrar informações de inicialização
    logger.log(`Environment: ${environment}`);
    logger.log(`MongoDB URI: ${configService.get<string>('MONGO_URI')?.substring(0, 20)}...`);
    logger.log(`JWT Secret: ${configService.get<string>('JWT_SECRET') ? '[definido]' : '[não definido]'}`);

    // Configurações de segurança
    app.use(helmet());
    app.enableCors({
      origin: corsOrigin,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    // Compressão de resposta
    app.use(compression());

    // Validação global
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Configuração do Swagger
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Templatesia API')
      .setDescription('API para a plataforma Templatesia de templates e IA para desenvolvedores')
      .setVersion('1.0')
      .addTag('auth', 'Endpoints de autenticação')
      .addTag('users', 'Endpoints de usuários')
      .addTag('templates', 'Endpoints de templates')
      .addTag('categories', 'Endpoints de categorias')
      .addTag('tags', 'Endpoints de tags')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

    // Prefixo global da API
    app.setGlobalPrefix('api');

    // Iniciar servidor
    await app.listen(port);
    logger.log(`🚀 Servidor rodando em: http://localhost:${port}/api`);
    logger.log(`📚 Documentação disponível em: http://localhost:${port}/api/docs`);
  } catch (error) {
    logger.error('❌ Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

bootstrap().catch(err => {
  const logger = new Logger('Bootstrap');
  logger.error('❌ Erro fatal:', err);
  process.exit(1);
}); 