import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { UserRole } from './create-user.dto';
import { PaginationParams } from '../../common/utils/pagination.helper';

/**
 * DTO para filtrar usuários
 */
export class FindUsersDto implements PaginationParams {
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
   * Nome do usuário (filtro parcial, case insensitive)
   * @example "João"
   */
  @ApiPropertyOptional({
    description: 'Nome do usuário (filtro parcial, case insensitive)',
    example: 'João',
  })
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * Email do usuário (filtro parcial, case insensitive)
   * @example "joao"
   */
  @ApiPropertyOptional({
    description: 'Email do usuário (filtro parcial, case insensitive)',
    example: 'joao',
  })
  @IsString()
  @IsOptional()
  email?: string;

  /**
   * Nome de usuário (filtro parcial, case insensitive)
   * @example "joao"
   */
  @ApiPropertyOptional({
    description: 'Nome de usuário (filtro parcial, case insensitive)',
    example: 'joao',
  })
  @IsString()
  @IsOptional()
  username?: string;

  /**
   * Papel do usuário
   * @example "PRO"
   */
  @ApiPropertyOptional({
    description: 'Papel do usuário',
    enum: UserRole,
    example: UserRole.PRO,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  /**
   * Se o email está verificado
   * @example true
   */
  @ApiPropertyOptional({
    description: 'Se o email está verificado',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
} 