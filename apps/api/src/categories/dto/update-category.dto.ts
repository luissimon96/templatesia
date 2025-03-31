import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ description: 'Nome da categoria', example: 'E-commerce', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Descrição da categoria', example: 'Templates para lojas virtuais e comércio eletrônico', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Slug da categoria (URL amigável)', example: 'e-commerce', required: false })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ description: 'Ícone da categoria', example: 'shopping-cart', required: false })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ description: 'ID da categoria pai (para subcategorias)', example: '60a1b2c3d4e5f6g7h8i9j0k1', required: false })
  @IsUUID('4')
  @IsOptional()
  parentId?: string;

  @ApiProperty({ description: 'Status de ativação da categoria', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 