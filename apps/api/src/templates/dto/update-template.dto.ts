import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsBoolean, IsArray, MaxLength, MinLength } from 'class-validator';
import { IsObjectId } from '../../common/decorators/is-object-id.decorator';
import { PricingType } from './create-template.dto';

/**
 * DTO para atualização de um template existente
 */
export class UpdateTemplateDto {
  /**
   * Título do template
   * @example "React Authentication Boilerplate - Updated"
   */
  @ApiPropertyOptional({
    description: 'Título do template',
    example: 'React Authentication Boilerplate - Updated',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  /**
   * Descrição do template
   * @example "Um boilerplate atualizado para autenticação em React com JWT"
   */
  @ApiPropertyOptional({
    description: 'Descrição do template',
    example: 'Um boilerplate atualizado para autenticação em React com JWT',
  })
  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(1000)
  description?: string;

  /**
   * Conteúdo do template
   * @example "// Conteúdo atualizado do template..."
   */
  @ApiPropertyOptional({
    description: 'Conteúdo do template',
    example: '// Conteúdo atualizado do template...',
  })
  @IsString()
  @IsOptional()
  content?: string;

  /**
   * Versão do template
   * @example "1.1.0"
   */
  @ApiPropertyOptional({
    description: 'Versão do template',
    example: '1.1.0',
  })
  @IsString()
  @IsOptional()
  version?: string;

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
   * Dependências do template
   */
  @ApiPropertyOptional({
    description: 'Dependências do template',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'react' },
        version: { type: 'string', example: '^18.2.0' },
        isRequired: { type: 'boolean', example: true },
      },
    },
  })
  @IsOptional()
  @IsArray()
  dependencies?: Array<{
    name: string;
    version: string;
    isRequired: boolean;
  }>;

  /**
   * Visibilidade do template
   * @example true
   */
  @ApiPropertyOptional({
    description: 'Visibilidade do template',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  /**
   * Tipo de acesso (FREE/PRO)
   * @example "PRO"
   */
  @ApiPropertyOptional({
    description: 'Tipo de acesso (FREE/PRO)',
    enum: PricingType,
    example: PricingType.PRO,
  })
  @IsOptional()
  @IsEnum(PricingType)
  pricing?: PricingType;
} 