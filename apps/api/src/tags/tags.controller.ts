import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tags' })
  @ApiResponse({ status: 200, description: 'Lista de tags retornada com sucesso' })
  async findAll() {
    return this.tagsService.findAll();
  }

  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Obter tag por ID ou slug' })
  @ApiParam({ name: 'idOrSlug', description: 'ID ou slug da tag', example: 'react' })
  @ApiResponse({ status: 200, description: 'Tag retornada com sucesso' })
  @ApiResponse({ status: 404, description: 'Tag não encontrada' })
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    // Verificar se é um ID ou slug
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      return this.tagsService.findById(idOrSlug);
    } else {
      return this.tagsService.findBySlug(idOrSlug);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar nova tag' })
  @ApiResponse({ status: 201, description: 'Tag criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar tag' })
  @ApiParam({ name: 'id', description: 'ID da tag', example: '60a1b2c3d4e5f6g7h8i9j0k1' })
  @ApiResponse({ status: 200, description: 'Tag atualizada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 404, description: 'Tag não encontrada' })
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir tag' })
  @ApiParam({ name: 'id', description: 'ID da tag', example: '60a1b2c3d4e5f6g7h8i9j0k1' })
  @ApiResponse({ status: 200, description: 'Tag excluída com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 404, description: 'Tag não encontrada' })
  async remove(@Param('id') id: string) {
    return this.tagsService.delete(id);
  }
} 