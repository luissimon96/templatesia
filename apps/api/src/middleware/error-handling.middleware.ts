import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppError } from '../utils/errors';
import logger from '../utils/logger';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno no servidor';
    let stack: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      message = typeof errorResponse === 'object' && 'message' in errorResponse
        ? Array.isArray(errorResponse.message)
          ? errorResponse.message.join(', ')
          : String(errorResponse.message)
        : String(errorResponse);
    } else if (exception instanceof AppError) {
      status = exception.statusCode;
      message = exception.message;
      stack = exception.stack;
    } else if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack;
    }

    // Log do erro
    logger.error(`[${status}] ${message}`, {
      stack,
      path: ctx.getRequest().url
    });

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
} 