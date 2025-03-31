import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { 
  IsString, 
  IsEmail, 
  IsNotEmpty, 
  MinLength, 
  MaxLength, 
  IsOptional, 
  IsEnum, 
  IsBoolean 
} from 'class-validator';

/**
 * Enum para os papéis de usuário
 */
export enum UserRole {
  USER = 'USER',
  PRO = 'PRO',
  ADMIN = 'ADMIN',
}

/**
 * DTO para criação de um novo usuário
 */
export class CreateUserDto {
  /**
   * Nome completo do usuário
   * @example "João Silva"
   */
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  /**
   * Email único do usuário
   * @example "joao@example.com"
   */
  @ApiProperty({
    description: 'Email único do usuário',
    example: 'joao@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Nome de usuário único (opcional)
   * @example "joaosilva"
   */
  @ApiPropertyOptional({
    description: 'Nome de usuário único',
    example: 'joaosilva',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  username?: string;

  /**
   * Senha do usuário
   * @example "senha123"
   */
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Senha@123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  /**
   * URL do avatar do usuário (opcional)
   * @example "https://example.com/avatar.jpg"
   */
  @ApiPropertyOptional({
    description: 'URL do avatar do usuário',
    example: 'https://example.com/avatar.jpg',
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  /**
   * Biografia do usuário (opcional)
   * @example "Desenvolvedor de software apaixonado por tecnologia"
   */
  @ApiPropertyOptional({
    description: 'Biografia do usuário',
    example: 'Desenvolvedor de software apaixonado por tecnologia',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  bio?: string;

  /**
   * Papel do usuário (padrão: USER)
   * @example "USER"
   */
  @ApiPropertyOptional({
    description: 'Papel do usuário',
    enum: UserRole,
    default: UserRole.USER,
    example: UserRole.USER,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole = UserRole.USER;

  /**
   * ID do GitHub para OAuth (opcional)
   * @example "12345678"
   */
  @ApiPropertyOptional({
    description: 'ID do GitHub para OAuth',
    example: '12345678',
  })
  @IsString()
  @IsOptional()
  githubId?: string;

  /**
   * Se o email está verificado (padrão: false)
   * @example false
   */
  @ApiPropertyOptional({
    description: 'Se o email está verificado',
    default: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean = false;

  /**
   * Se a autenticação de dois fatores está ativada (padrão: false)
   * @example false
   */
  @ApiPropertyOptional({
    description: 'Se a autenticação de dois fatores está ativada',
    default: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  is2FAEnabled?: boolean = false;
} 