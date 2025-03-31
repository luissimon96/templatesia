import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Interface para o formato padrão de resposta da API
 */
export interface ApiResponse<T> {
  /**
   * Status da resposta
   */
  status: boolean;
  
  /**
   * Mensagem descritiva
   */
  message: string;
  
  /**
   * Dados da resposta
   */
  data: T;
  
  /**
   * Timestamp da resposta
   */
  timestamp: string;
}

/**
 * Interceptor que transforma todas as respostas da API para um formato padrão
 */
@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  /**
   * Intercepta a resposta e a transforma para o formato padrão
   * 
   * @param context - Contexto de execução
   * @param next - Handler de chamada
   * @returns Observable com a resposta transformada
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const timestamp = new Date().toISOString();
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    
    // Extrai a mensagem customizada se definida pelo controlador
    const responseMessage = response.locals?.message || 'Success';
    
    return next.handle().pipe(
      map(data => ({
        status: true,
        message: responseMessage,
        data,
        timestamp,
        path: request.url,
      })),
    );
  }
} 