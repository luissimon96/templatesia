import { ApiPropertyOptional } from '@nestjs/swagger';
import { 
  IsString, 
  IsEmail, 
  MinLength, 
  MaxLength, 
  IsOptional, 
  IsEnum, 
  IsBoolean 
} from 'class-validator';
import { UserRole } from './create-user.dto';

/**
 * DTO para atualização de um usuário existente
 */
export class UpdateUserDto {
  /**
   * Nome completo do usuário
   * @example "João Silva Atualizado"
   */
  @ApiPropertyOptional({
    description: 'Nome completo do usuário',
    example: 'João Silva Atualizado',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  /**
   * Email único do usuário
   * @example "joao.novo@example.com"
   */
  @ApiPropertyOptional({
    description: 'Email único do usuário',
    example: 'joao.novo@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  /**
   * Nome de usuário único
   * @example "joaosilva2"
   */
  @ApiPropertyOptional({
    description: 'Nome de usuário único',
    example: 'joaosilva2',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  username?: string;

  /**
   * Senha do usuário
   * @example "novaSenha123"
   */
  @ApiPropertyOptional({
    description: 'Senha do usuário',
    example: 'NovaSenha@123',
  })
  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(100)
  password?: string;

  /**
   * URL do avatar do usuário
   * @example "https://example.com/novo-avatar.jpg"
   */
  @ApiPropertyOptional({
    description: 'URL do avatar do usuário',
    example: 'https://example.com/novo-avatar.jpg',
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  /**
   * Biografia do usuário
   * @example "Biografia atualizada do desenvolvedor"
   */
  @ApiPropertyOptional({
    description: 'Biografia do usuário',
    example: 'Biografia atualizada do desenvolvedor',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  bio?: string;

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
   * ID do GitHub para OAuth
   * @example "87654321"
   */
  @ApiPropertyOptional({
    description: 'ID do GitHub para OAuth',
    example: '87654321',
  })
  @IsString()
  @IsOptional()
  githubId?: string;

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

  /**
   * Se a autenticação de dois fatores está ativada
   * @example true
   */
  @ApiPropertyOptional({
    description: 'Se a autenticação de dois fatores está ativada',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  is2FAEnabled?: boolean;
} 