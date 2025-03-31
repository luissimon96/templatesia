import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { FindTemplatesDto } from './dto/find-templates.dto';

@ApiTags('templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar templates' })
  @ApiResponse({ status: 200, description: 'Lista de templates retornada com sucesso' })
  async findAll(@Query() query: FindTemplatesDto) {
    const filters: any = {};
    
    if (query.category) {
      filters.categoryId = query.category;
    }
    
    if (query.tags) {
      filters.tags = { some: { id: { in: query.tags.split(',') } } };
    }
    
    if (query.search) {
      filters.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.pricing) {
      filters.pricing = query.pricing;
    }
    
    return this.templatesService.findAll(
      query.page ? parseInt(query.page, 10) : 1,
      query.limit ? parseInt(query.limit, 10) : 10,
      filters
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter template por ID' })
  @ApiParam({ name: 'id', description: 'ID do template', example: '60a1b2c3d4e5f6g7h8i9j0k1' })
  @ApiResponse({ status: 200, description: 'Template retornado com sucesso' })
  @ApiResponse({ status: 404, description: 'Template não encontrado' })
  async findOne(@Param('id') id: string) {
    return this.templatesService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo template' })
  @ApiResponse({ status: 201, description: 'Template criado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async create(@Body() createTemplateDto: CreateTemplateDto, @Request() req) {
    return this.templatesService.create(createTemplateDto, req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar template' })
  @ApiParam({ name: 'id', description: 'ID do template', example: '60a1b2c3d4e5f6g7h8i9j0k1' })
  @ApiResponse({ status: 200, description: 'Template atualizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Template não encontrado' })
  async update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto, @Request() req) {
    return this.templatesService.update(id, updateTemplateDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir template' })
  @ApiParam({ name: 'id', description: 'ID do template', example: '60a1b2c3d4e5f6g7h8i9j0k1' })
  @ApiResponse({ status: 200, description: 'Template excluído com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Template não encontrado' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.templatesService.delete(id, req.user.id);
  }
} 