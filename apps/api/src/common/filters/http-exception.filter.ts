import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Filtro global para tratar exceções HTTP
 * 
 * Formata todas as exceções em uma resposta consistente
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * Manipula as exceções
   * 
   * @param exception - A exceção capturada
   * @param host - O host de argumentos
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const timestamp = new Date().toISOString();

    let status: number;
    let message: string | object;
    let error: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'object') {
        const exceptionObj = exceptionResponse as Record<string, any>;
        message = exceptionObj.message || exception.message;
        error = exceptionObj.error || 'Http Exception';
      } else {
        message = exceptionResponse;
        error = exception.message;
      }
    } else {
      this.logger.error(exception);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
      error = 'Internal Server Error';

      // Se for um erro conhecido, use a mensagem dele
      if (exception instanceof Error) {
        message = exception.message;
      }
    }

    response.status(status).json({
      status: false,
      message,
      error,
      timestamp,
      path: request.url,
      statusCode: status,
    });
  }
} 