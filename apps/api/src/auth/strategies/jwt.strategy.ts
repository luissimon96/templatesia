import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../services/authService';
import { env } from '../../config';
import logger from '../../utils/logger';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
    logger.debug('🔐 JwtStrategy inicializada');
  }

  async validate(payload: any) {
    logger.debug('🔍 Validando token JWT', { sub: payload.sub });

    const user = await this.authService.validateUser(payload.sub);

    if (!user) {
      logger.warn('❌ Usuário não encontrado durante validação de token', { sub: payload.sub });
      throw new UnauthorizedException('Usuário não encontrado');
    }

    logger.debug('✅ Token JWT validado com sucesso', { sub: payload.sub });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };
  }
} 