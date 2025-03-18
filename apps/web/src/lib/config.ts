import { logger } from './logger';

interface EnvConfig {
  NODE_ENV: string;
  MONGO_URI: string;
  API_URL: string;
  APP_URL: string;
}

class Config {
  private static instance: Config;
  private config: Partial<EnvConfig> = {};

  private constructor() {
    this.loadConfig();
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  private loadConfig() {
    this.config = {
      NODE_ENV: process.env.NODE_ENV || 'development',
      MONGO_URI: process.env.MONGO_URI || '',
      API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
      APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    };

    // Verificar se as configurações necessárias estão definidas
    if (!this.config.MONGO_URI) {
      logger.warn('MONGO_URI não está configurado. A conexão com o MongoDB não funcionará!');
    }

    if (this.config.NODE_ENV === 'development') {
      logger.info(`Configuração carregada para ambiente: ${this.config.NODE_ENV}`);
    }
  }

  get<K extends keyof EnvConfig>(key: K): EnvConfig[K] {
    return this.config[key] as EnvConfig[K];
  }

  getAll(): Partial<EnvConfig> {
    return { ...this.config };
  }

  isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }
}

// Exportar a instância singleton
export const env = Config.getInstance(); 