import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/userRepository';
import { LoginDTO, RegisterDTO, User, UserResponse } from '../types/User';
import { ConflictError, UnauthorizedError } from '../utils/errors';
import logger from '../utils/logger';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) { }

  async register(registerDto: RegisterDTO): Promise<UserResponse> {
    // Verificar se o email já está em uso
    const existingUser = await this.userRepository.findByEmail(registerDto.email);
    if (existingUser) {
      logger.warn(`Tentativa de registro com email já existente: ${registerDto.email}`);
      throw new ConflictError('Email já está em uso');
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    // Criar o usuário
    const newUser = await this.userRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(registerDto.name)}`,
      isAdmin: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    logger.info(`✅ Usuário registrado com sucesso: ${newUser.email}`);

    // Gerar token JWT
    const token = this.generateToken(newUser);

    // Retornar dados sem senha
    return {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      photoUrl: newUser.photoUrl,
      isAdmin: newUser.isAdmin,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  async login(loginDto: LoginDTO): Promise<{ user: UserResponse; token: string }> {
    // Buscar usuário pelo email
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
      logger.warn(`Tentativa de login com email não encontrado: ${loginDto.email}`);
      throw new UnauthorizedError('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      logger.warn(`Tentativa de login com senha inválida: ${loginDto.email}`);
      throw new UnauthorizedError('Credenciais inválidas');
    }

    logger.info(`✅ Login bem-sucedido: ${user.email}`);

    // Gerar token JWT
    const token = this.generateToken(user);

    // Retornar usuário sem senha
    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  }

  async validateUser(userId: string): Promise<UserResponse | null> {
    try {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        return null;
      }

      // Retornar usuário sem senha
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      logger.error(`Erro ao validar usuário ${userId}:`, error);
      return null;
    }
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin,
    };

    return this.jwtService.sign(payload);
  }
} 