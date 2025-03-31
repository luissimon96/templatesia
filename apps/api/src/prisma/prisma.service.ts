import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

/**
 * Serviço para gerenciar a conexão com o banco de dados através do Prisma
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * Construtor do serviço Prisma
   * 
   * @param configService - Serviço de configuração para acessar variáveis de ambiente
   */
  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('MONGO_URI'),
        },
      },
      log: configService.get<string>('NODE_ENV') === 'development' 
        ? ['query', 'error', 'warn'] 
        : ['error'],
    });
  }

  /**
   * Inicializa a conexão com o banco de dados quando o módulo é inicializado
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Fecha a conexão com o banco de dados quando o módulo é destruído
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Limpa os dados do banco para testes
   * AVISO: Usar apenas em ambiente de teste!
   */
  async cleanDatabase() {
    if (this.configService.get<string>('NODE_ENV') !== 'test') {
      throw new Error('Cannot clean database in non-test environment');
    }

    // A ordem é importante devido às restrições de foreign key
    const models = Reflect.ownKeys(this).filter(
      key => key[0] !== '_' && key[0] !== '$' && typeof this[key] === 'object' && this[key] !== null,
    );

    return Promise.all(
      models.map(modelKey => this[modelKey].deleteMany()),
    );
  }
} 