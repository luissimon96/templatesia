import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsBoolean, IsArray, MaxLength, MinLength, IsUUID } from 'class-validator';
import { IsObjectId } from '../../common/decorators/is-object-id.decorator';

/**
 * Enum para tipos de pricing
 */
export enum PricingType {
  FREE = 'FREE',
  PRO = 'PRO',
}

/**
 * DTO para criação de um novo template
 */
export class CreateTemplateDto {
  /**
   * Título do template
   * @example "React Authentication Boilerplate"
   */
  @ApiProperty({
    description: 'Título do template',
    example: 'React Authentication Boilerplate',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  /**
   * Descrição do template
   * @example "Um boilerplate completo para autenticação em React com JWT"
   */
  @ApiProperty({
    description: 'Descrição do template',
    example: 'Um boilerplate completo para autenticação em React com JWT',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  /**
   * Conteúdo do template
   * @example "// Conteúdo do template..."
   */
  @ApiProperty({
    description: 'Conteúdo do template',
    example: '// Conteúdo do template...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  /**
   * Versão do template
   * @example "1.0.0"
   */
  @ApiProperty({
    description: 'Versão do template',
    example: '1.0.0',
  })
  @IsString()
  @IsNotEmpty()
  version: string;

  /**
   * ID do autor (preenchido automaticamente pelo sistema)
   */
  @ApiProperty({
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
  @ApiProperty({
    description: 'ID da categoria',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsObjectId()
  categoryId: string;

  /**
   * Framework utilizado
   * @example "React"
   */
  @ApiProperty({
    description: 'Framework utilizado',
    example: 'React',
  })
  @IsString()
  @IsNotEmpty()
  framework: string;

  /**
   * Linguagem principal
   * @example "TypeScript"
   */
  @ApiProperty({
    description: 'Linguagem principal',
    example: 'TypeScript',
  })
  @IsString()
  @IsNotEmpty()
  language: string;

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
        version: { type: 'string', example: '^18.0.0' },
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
   * IDs das tags
   * @example ["60d21b4667d0d8992e610c85", "60d21b4667d0d8992e610c86"]
   */
  @ApiPropertyOptional({
    description: 'IDs das tags',
    type: 'array',
    items: {
      type: 'string',
      example: '60d21b4667d0d8992e610c85',
    },
  })
  @IsOptional()
  @IsArray()
  @IsObjectId({ each: true })
  tagIds?: string[];

  /**
   * Visibilidade do template
   * @example true
   */
  @ApiPropertyOptional({
    description: 'Visibilidade do template',
    default: true,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean = true;

  /**
   * Tipo de acesso (FREE/PRO)
   * @example "FREE"
   */
  @ApiPropertyOptional({
    description: 'Tipo de acesso (FREE/PRO)',
    enum: PricingType,
    default: PricingType.FREE,
    example: PricingType.FREE,
  })
  @IsOptional()
  @IsEnum(PricingType)
  pricing?: PricingType = PricingType.FREE;
} 