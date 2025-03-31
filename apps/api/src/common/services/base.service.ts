import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../interfaces/paginated-result.interface';
import { PaginationHelper, PaginationParams } from '../utils/pagination.helper';

/**
 * Interface para erros do Prisma
 */
interface PrismaError {
  code?: string;
  meta?: Record<string, any>;
  message: string;
}

/**
 * Serviço base genérico para operações CRUD usando Prisma
 * 
 * @template T - O tipo do modelo Prisma
 * @template CreateDto - O DTO para criação de entidades
 * @template UpdateDto - O DTO para atualização de entidades
 * @template FilterDto - O DTO para filtragem de entidades
 */
export abstract class BaseService<T, CreateDto, UpdateDto, FilterDto = any> {
  /**
   * O nome do modelo Prisma (usado para mensagens de erro)
   */
  protected abstract readonly modelName: string;

  /**
   * Construtor do serviço base
   * 
   * @param prisma - O serviço Prisma para acesso ao banco de dados
   */
  constructor(protected readonly prisma: PrismaService) {}

  /**
   * Retorna o modelo Prisma apropriado
   * 
   * @protected
   * @abstract
   * @returns O modelo Prisma para as operações
   */
  protected abstract getModel(): any;

  /**
   * Constrói a consulta de filtro para o modelo
   * 
   * @protected
   * @param filters - Os filtros a serem aplicados
   * @returns O objeto de filtro para o Prisma
   */
  protected buildFilterQuery(filters: FilterDto): any {
    // Implementação padrão (pode ser sobrescrita por serviços específicos)
    return {};
  }

  /**
   * Cria uma nova entidade
   * 
   * @param data - Os dados para criação da entidade
   * @returns A entidade criada
   */
  async create(data: CreateDto): Promise<T> {
    return this.getModel().create({
      data,
    });
  }

  /**
   * Encontra uma entidade pelo ID
   * 
   * @param id - O ID da entidade
   * @param includeRelations - Se deve incluir relações
   * @returns A entidade encontrada
   * @throws NotFoundException - Se a entidade não for encontrada
   */
  async findById(id: string, includeRelations = false): Promise<T> {
    const include = includeRelations ? this.getRelationsToInclude() : undefined;

    const entity = await this.getModel().findUnique({
      where: { id },
      include,
    });

    if (!entity) {
      throw new NotFoundException(`${this.modelName} with ID "${id}" not found`);
    }

    return entity;
  }

  /**
   * Lista todas as entidades de forma paginada
   * 
   * @param params - Parâmetros de paginação
   * @param filters - Filtros para a consulta
   * @returns Resultado paginado com as entidades
   */
  async findAll(params: PaginationParams, filters?: FilterDto): Promise<PaginatedResult<T>> {
    const { skip, take } = PaginationHelper.getPaginationConfig(params);
    const where = filters ? this.buildFilterQuery(filters) : {};

    const [entities, total] = await Promise.all([
      this.getModel().findMany({
        where,
        skip,
        take,
        orderBy: this.getDefaultOrderBy(),
        include: this.getRelationsToInclude(),
      }),
      this.getModel().count({ where }),
    ]);

    return PaginationHelper.createPaginatedResult(entities, total, params);
  }

  /**
   * Atualiza uma entidade pelo ID
   * 
   * @param id - O ID da entidade
   * @param data - Os dados para atualização
   * @returns A entidade atualizada
   * @throws NotFoundException - Se a entidade não for encontrada
   */
  async update(id: string, data: UpdateDto): Promise<T> {
    try {
      return await this.getModel().update({
        where: { id },
        data,
      });
    } catch (error) {
      const prismaError = error as PrismaError;
      if (prismaError.code === 'P2025') {
        throw new NotFoundException(`${this.modelName} with ID "${id}" not found`);
      }
      throw error;
    }
  }

  /**
   * Remove uma entidade pelo ID
   * 
   * @param id - O ID da entidade
   * @returns A entidade removida
   * @throws NotFoundException - Se a entidade não for encontrada
   */
  async remove(id: string): Promise<T> {
    try {
      return await this.getModel().delete({
        where: { id },
      });
    } catch (error) {
      const prismaError = error as PrismaError;
      if (prismaError.code === 'P2025') {
        throw new NotFoundException(`${this.modelName} with ID "${id}" not found`);
      }
      throw error;
    }
  }

  /**
   * Verifica se uma entidade existe pelo ID
   * 
   * @param id - O ID da entidade
   * @returns true se a entidade existir, false caso contrário
   */
  async exists(id: string): Promise<boolean> {
    const count = await this.getModel().count({
      where: { id },
    });
    return count > 0;
  }

  /**
   * Obtém as relações a serem incluídas nas consultas
   * 
   * @protected
   * @returns Objeto com as relações a incluir
   */
  protected getRelationsToInclude(): Record<string, boolean> {
    // Por padrão, não inclui nenhuma relação (deve ser sobrescrito por serviços específicos)
    return {};
  }

  /**
   * Obtém a ordenação padrão para consultas
   * 
   * @protected
   * @returns Objeto com a ordenação padrão
   */
  protected getDefaultOrderBy(): any {
    // Por padrão, ordena por createdAt decrescente
    return { createdAt: 'desc' };
  }
} 