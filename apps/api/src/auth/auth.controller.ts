import { Body, Controller, Post, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/authService';
import { LoginDTO, RegisterDTO } from '../types/User';
import { GlobalExceptionFilter } from '../middleware/error-handling.middleware';
import logger from '../utils/logger';

@ApiTags('auth')
@Controller('auth')
@UseFilters(GlobalExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email já existe' })
  async register(@Body() registerDto: RegisterDTO) {
    logger.debug('📝 Solicitação de registro recebida', { email: registerDto.email });
    const result = await this.authService.register(registerDto);
    return {
      success: true,
      message: 'Usuário registrado com sucesso',
      user: result
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiResponse({ status: 200, description: 'Autenticação bem-sucedida' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: LoginDTO) {
    logger.debug('🔑 Solicitação de login recebida', { email: loginDto.email });
    const result = await this.authService.login(loginDto);
    return {
      success: true,
      message: 'Login bem-sucedido',
      ...result
    };
  }
} 