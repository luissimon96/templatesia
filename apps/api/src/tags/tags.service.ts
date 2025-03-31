import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TagsService {
  private prisma: PrismaClient;

  constructor(private configService: ConfigService) {
    this.prisma = new PrismaClient();
  }

  async findAll() {
    return this.prisma.tag.findMany({
      orderBy: [
        { count: 'desc' },
        { name: 'asc' },
      ],
    });
  }

  async findById(id: string) {
    return this.prisma.tag.findUnique({
      where: { id },
      include: {
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

  async findBySlug(slug: string) {
    return this.prisma.tag.findUnique({
      where: { slug },
      include: {
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
    return this.prisma.tag.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.prisma.tag.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.tag.delete({
      where: { id },
    });
  }
} 