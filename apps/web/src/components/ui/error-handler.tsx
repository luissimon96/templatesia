import React from 'react';
import { logger } from '@/lib/logger';
import { Alert, AlertTitle, AlertDescription } from './alert';
import { AlertTriangle, Ban, RefreshCw } from 'lucide-react';
import { Button } from './button';

export interface ErrorProps {
  error: Error | null;
  resetErrorBoundary?: () => void;
  message?: string;
  retry?: () => void;
  children?: React.ReactNode;
}

/**
 * Componente que exibe mensagens de erro amigáveis ao usuário
 */
export function ErrorHandler({
  error,
  resetErrorBoundary,
  message,
  retry,
  children,
}: ErrorProps) {
  // Log do erro para monitoramento
  React.useEffect(() => {
    if (error) {
      logger.error('Erro capturado pelo ErrorHandler', error);
    }
  }, [error]);

  // Se não houver erro, renderiza os filhos normalmente
  if (!error) {
    return <>{children}</>;
  }

  // Mensagem de erro exibida ao usuário
  const displayMessage = message || 'Ocorreu um erro. Por favor, tente novamente.';

  // Função para tentar novamente
  const handleRetry = () => {
    if (retry) {
      retry();
    } else if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  // Determinar tipo de erro para personalizar a mensagem
  let errorType: 'connection' | 'server' | 'unknown' = 'unknown';

  if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('connection')) {
    errorType = 'connection';
  } else if (error.message.includes('500') || error.message.includes('server')) {
    errorType = 'server';
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 min-h-32">
      <Alert variant="destructive" className="max-w-md">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>
          {errorType === 'connection' && 'Erro de Conexão'}
          {errorType === 'server' && 'Erro no Servidor'}
          {errorType === 'unknown' && 'Erro'}
        </AlertTitle>
        <AlertDescription>
          {errorType === 'connection'
            ? 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.'
            : errorType === 'server'
              ? 'O servidor encontrou um problema. Nossa equipe foi notificada.'
              : displayMessage}
        </AlertDescription>
      </Alert>

      <div className="flex space-x-2">
        <Button onClick={handleRetry} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar novamente
        </Button>

        {process.env.NODE_ENV === 'development' && (
          <Button
            onClick={() => console.info('Detalhes do erro:', error)}
            variant="ghost"
            size="sm"
          >
            Ver detalhes (DEV)
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * Componente para página de erro 404
 */
export function NotFoundError() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 min-h-[50vh]">
      <Ban className="h-16 w-16 text-muted-foreground" />
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <p className="text-muted-foreground text-center">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button onClick={() => window.location.href = '/'}>
        Voltar para a página inicial
      </Button>
    </div>
  );
}

/**
 * HOC para facilitar o tratamento de erros em componentes de dados
 */
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>,
  errorMessage?: string
): React.FC<P & { error?: Error | null }> {
  return (props) => {
    if (props.error) {
      return (
        <ErrorHandler
          error={props.error}
          message={errorMessage}
        />
      );
    }

    return <Component {...props} />;
  };
} 