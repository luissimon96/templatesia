import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoriesService {
  private prisma: PrismaClient;

  constructor(private configService: ConfigService) {
    this.prisma = new PrismaClient();
  }

  async findAll() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      include: {
        children: {
          where: { isActive: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        templates: {
          take: 10,
          orderBy: { createdAt: 'desc' },
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

  async create(data: any) {
    return this.prisma.category.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    // Verificar se existem templates nesta categoria
    const templatesCount = await this.prisma.template.count({
      where: { categoryId: id },
    });

    if (templatesCount > 0) {
      // Se existirem templates, apenas marcar como inativa
      return this.prisma.category.update({
        where: { id },
        data: { isActive: false },
      });
    }

    // Se não existirem templates, deletar a categoria
    return this.prisma.category.delete({
      where: { id },
    });
  }
} 