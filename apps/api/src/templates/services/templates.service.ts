import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseService } from '../../common/services/base.service';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { UpdateTemplateDto } from '../dto/update-template.dto';
import { FindTemplatesDto } from '../dto/find-templates.dto';

/**
 * Serviço para operações relacionadas a templates
 */
@Injectable()
export class TemplatesService extends BaseService<
  any, // Tipo do modelo Template do Prisma
  CreateTemplateDto,
  UpdateTemplateDto,
  FindTemplatesDto
> {
  private readonly logger = new Logger(TemplatesService.name);
  protected readonly modelName = 'Template';

  /**
   * Construtor do serviço de templates
   * 
   * @param prisma - Serviço Prisma para acesso ao banco de dados
   */
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  /**
   * Retorna o modelo Prisma de templates
   * 
   * @returns Modelo Prisma de templates
   */
  protected getModel() {
    return this.prisma.template;
  }

  /**
   * Constrói a consulta de filtro para templates
   * 
   * @param filters - Filtros para a consulta
   * @returns Objeto de filtro para o Prisma
   */
  protected buildFilterQuery(filters: FindTemplatesDto) {
    const where: any = {};

    if (filters.title) {
      where.title = {
        contains: filters.title,
        mode: 'insensitive',
      };
    }

    if (filters.authorId) {
      where.authorId = filters.authorId;
    }

    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters.framework) {
      where.framework = filters.framework;
    }

    if (filters.language) {
      where.language = filters.language;
    }

    if (filters.isPublic !== undefined) {
      where.isPublic = filters.isPublic;
    }

    if (filters.isVerified !== undefined) {
      where.isVerified = filters.isVerified;
    }

    return where;
  }

  /**
   * Obtém as relações a serem incluídas nas consultas
   * 
   * @returns Objeto com as relações a incluir
   */
  protected getRelationsToInclude() {
    return {
      author: true,
      category: true,
      tags: true,
    };
  }

  /**
   * Obtém a ordenação padrão para consultas
   * 
   * @returns Objeto com a ordenação padrão
   */
  protected getDefaultOrderBy() {
    return {
      createdAt: 'desc',
    };
  }

  /**
   * Busca templates por tags
   * 
   * @param tagIds - IDs das tags
   * @returns Array de templates
   */
  async findByTags(tagIds: string[]) {
    const templates = await this.prisma.template.findMany({
      where: {
        tags: {
          some: {
            id: {
              in: tagIds,
            },
          },
        },
      },
      include: this.getRelationsToInclude(),
    });

    return templates;
  }

  /**
   * Incrementa o contador de downloads de um template
   * 
   * @param id - ID do template
   * @returns Template atualizado
   */
  async incrementDownloads(id: string) {
    return this.prisma.template.update({
      where: { id },
      data: {
        downloads: {
          increment: 1,
        },
      },
    });
  }

  /**
   * Adiciona uma tag a um template
   * 
   * @param templateId - ID do template
   * @param tagId - ID da tag
   * @returns Template atualizado
   */
  async addTag(templateId: string, tagId: string) {
    return this.prisma.template.update({
      where: { id: templateId },
      data: {
        tags: {
          connect: { id: tagId },
        },
      },
      include: this.getRelationsToInclude(),
    });
  }

  /**
   * Remove uma tag de um template
   * 
   * @param templateId - ID do template
   * @param tagId - ID da tag
   * @returns Template atualizado
   */
  async removeTag(templateId: string, tagId: string) {
    return this.prisma.template.update({
      where: { id: templateId },
      data: {
        tags: {
          disconnect: { id: tagId },
        },
      },
      include: this.getRelationsToInclude(),
    });
  }
} 