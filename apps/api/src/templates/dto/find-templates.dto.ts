import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { IsObjectId } from '../../common/decorators/is-object-id.decorator';
import { PricingType } from './create-template.dto';
import { PaginationParams } from '../../common/utils/pagination.helper';

/**
 * DTO para filtrar templates
 */
export class FindTemplatesDto implements PaginationParams {
  /**
   * Número da página
   * @example 1
   */
  @ApiPropertyOptional({
    description: 'Número da página',
    default: 1,
    example: 1,
  })
  @IsOptional()
  page?: number;

  /**
   * Quantidade de itens por página
   * @example 10
   */
  @ApiPropertyOptional({
    description: 'Quantidade de itens por página',
    default: 10,
    example: 10,
  })
  @IsOptional()
  limit?: number;

  /**
   * Título do template (filtro parcial, case insensitive)
   * @example "React"
   */
  @ApiPropertyOptional({
    description: 'Título do template (filtro parcial, case insensitive)',
    example: 'React',
  })
  @IsString()
  @IsOptional()
  title?: string;

  /**
   * ID do autor
   * @example "60d21b4667d0d8992e610c85"
   */
  @ApiPropertyOptional({
    description: 'ID do autor',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsObjectId()
  @IsOptional()
  authorId?: string;

  /**
   * ID da categoria
   * @example "60d21b4667d0d8992e610c85"
   */
  @ApiPropertyOptional({
    description: 'ID da categoria',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsObjectId()
  @IsOptional()
  categoryId?: string;

  /**
   * Framework utilizado
   * @example "React"
   */
  @ApiPropertyOptional({
    description: 'Framework utilizado',
    example: 'React',
  })
  @IsString()
  @IsOptional()
  framework?: string;

  /**
   * Linguagem principal
   * @example "TypeScript"
   */
  @ApiPropertyOptional({
    description: 'Linguagem principal',
    example: 'TypeScript',
  })
  @IsString()
  @IsOptional()
  language?: string;

  /**
   * Visibilidade do template
   * @example true
   */
  @ApiPropertyOptional({
    description: 'Visibilidade do template',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  /**
   * Template verificado
   * @example true
   */
  @ApiPropertyOptional({
    description: 'Template verificado',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  /**
   * Tipo de acesso (FREE/PRO)
   * @example "FREE"
   */
  @ApiPropertyOptional({
    description: 'Tipo de acesso (FREE/PRO)',
    enum: PricingType,
    example: PricingType.FREE,
  })
  @IsEnum(PricingType)
  @IsOptional()
  pricing?: PricingType;
} 