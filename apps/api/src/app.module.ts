import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { GlobalExceptionFilter } from './middleware/error-handling.middleware';
import { env } from './config';

@Module({
  imports: [
    // Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minuto
      limit: 100, // 100 requisições
    }]),

    // Módulos da aplicação
    AuthModule,
  ],
  providers: [
    // Filtro global de exceções
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {
  constructor() {
    console.log(`API iniciada no ambiente: ${env.NODE_ENV}`);
    console.log(`Porta: ${env.PORT}`);
  }
} 