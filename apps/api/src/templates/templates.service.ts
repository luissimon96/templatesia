import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TemplatesService {
  private prisma: PrismaClient;

  constructor(private configService: ConfigService) {
    this.prisma = new PrismaClient();
  }

  async findAll(page = 1, limit = 10, filters: any = {}) {
    const skip = (page - 1) * limit;
    
    const where = {
      isPublic: true,
      ...filters,
    };

    const [templates, total] = await Promise.all([
      this.prisma.template.findMany({
        skip,
        take: limit,
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
          category: true,
          tags: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.template.count({ where }),
    ]);

    return {
      data: templates,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return this.prisma.template.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        category: true,
        tags: true,
        reviews: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async create(data: any, userId: string) {
    return this.prisma.template.create({
      data: {
        ...data,
        author: {
          connect: { id: userId },
        },
        category: {
          connect: { id: data.categoryId },
        },
        tags: {
          connect: data.tagIds.map(id => ({ id })),
        },
      },
    });
  }

  async update(id: string, data: any, userId: string) {
    // Verificar se o template pertence ao usuário
    const template = await this.prisma.template.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (template.authorId !== userId) {
      throw new Error('Unauthorized');
    }

    return this.prisma.template.update({
      where: { id },
      data: {
        ...data,
        category: data.categoryId ? {
          connect: { id: data.categoryId },
        } : undefined,
        tags: data.tagIds ? {
          set: [],
          connect: data.tagIds.map(id => ({ id })),
        } : undefined,
      },
    });
  }

  async delete(id: string, userId: string) {
    // Verificar se o template pertence ao usuário
    const template = await this.prisma.template.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (template.authorId !== userId) {
      throw new Error('Unauthorized');
    }

    return this.prisma.template.delete({
      where: { id },
    });
  }
} 