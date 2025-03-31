import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Módulo global para o serviço Prisma
 * 
 * Este módulo é marcado como @Global, o que significa que o PrismaService
 * estará disponível para injeção em toda a aplicação sem necessidade de importar
 * este módulo explicitamente em cada módulo que precisa do serviço.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {} 