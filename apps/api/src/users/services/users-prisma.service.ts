import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseService } from '../../common/services/base.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindUsersDto } from '../dto/find-users.dto';
import * as bcrypt from 'bcryptjs';

/**
 * Serviço para operações relacionadas a usuários usando Prisma
 */
@Injectable()
export class UsersPrismaService extends BaseService<
  any, // Tipo do modelo User do Prisma
  CreateUserDto,
  UpdateUserDto,
  FindUsersDto
> {
  private readonly logger = new Logger(UsersPrismaService.name);
  protected readonly modelName = 'User';

  /**
   * Construtor do serviço de usuários
   * 
   * @param prisma - Serviço Prisma para acesso ao banco de dados
   */
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  /**
   * Retorna o modelo Prisma de usuários
   * 
   * @returns Modelo Prisma de usuários
   */
  protected getModel() {
    return this.prisma.user;
  }

  /**
   * Constrói a consulta de filtro para usuários
   * 
   * @param filters - Filtros para a consulta
   * @returns Objeto de filtro para o Prisma
   */
  protected buildFilterQuery(filters: FindUsersDto) {
    const where: any = {};

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    if (filters.email) {
      where.email = {
        contains: filters.email,
        mode: 'insensitive',
      };
    }

    if (filters.username) {
      where.username = {
        contains: filters.username,
        mode: 'insensitive',
      };
    }

    if (filters.role) {
      where.role = filters.role;
    }

    if (filters.isVerified !== undefined) {
      where.isVerified = filters.isVerified;
    }

    return where;
  }

  /**
   * Sobrescreve o método create para hash da senha
   * 
   * @param data - Dados para criação do usuário
   * @returns O usuário criado
   */
  async create(data: CreateUserDto): Promise<any> {
    // Verificar se o email já existe
    const existingUserByEmail = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUserByEmail) {
      throw new ConflictException(`Usuário com email ${data.email} já existe`);
    }

    // Verificar se o username já existe
    if (data.username) {
      const existingUserByUsername = await this.prisma.user.findUnique({
        where: { username: data.username },
      });

      if (existingUserByUsername) {
        throw new ConflictException(`Usuário com username ${data.username} já existe`);
      }
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Criar usuário com senha hasheada
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    // Remover a senha do objeto retornado
    const { password, ...result } = user;
    return result;
  }

  /**
   * Sobrescreve o método update para hash da senha se for atualizada
   * 
   * @param id - ID do usuário
   * @param data - Dados para atualização
   * @returns O usuário atualizado
   */
  async update(id: string, data: UpdateUserDto): Promise<any> {
    // Se a senha foi fornecida, fazer hash
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Verificar duplicação de email
    if (data.email) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: data.email,
          id: { not: id },
        },
      });

      if (existingUser) {
        throw new ConflictException(`Usuário com email ${data.email} já existe`);
      }
    }

    // Verificar duplicação de username
    if (data.username) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          username: data.username,
          id: { not: id },
        },
      });

      if (existingUser) {
        throw new ConflictException(`Usuário com username ${data.username} já existe`);
      }
    }

    // Atualizar usuário
    const user = await super.update(id, data);

    // Remover a senha do objeto retornado
    const { password, ...result } = user;
    return result;
  }

  /**
   * Obtém as relações a serem incluídas nas consultas
   */
  protected getRelationsToInclude() {
    return {};
  }

  /**
   * Busca um usuário pelo email
   * 
   * @param email - Email do usuário
   * @returns O usuário encontrado ou null
   */
  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Busca um usuário pelo username
   * 
   * @param username - Username do usuário
   * @returns O usuário encontrado ou null
   */
  async findByUsername(username: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  /**
   * Valida as credenciais do usuário
   * 
   * @param email - Email do usuário
   * @param password - Senha do usuário
   * @returns O usuário se as credenciais forem válidas, null caso contrário
   */
  async validateCredentials(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);
    
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }

    // Retornar usuário sem a senha
    const { password: _, ...result } = user;
    return result;
  }
} 