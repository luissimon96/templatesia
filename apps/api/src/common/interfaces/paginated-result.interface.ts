/**
 * Metadata para resultados paginados
 */
export interface PaginationMeta {
  /**
   * Número total de itens
   */
  total: number;
  
  /**
   * Página atual (1-indexed)
   */
  page: number;
  
  /**
   * Número de itens por página
   */
  limit: number;
  
  /**
   * Número total de páginas
   */
  totalPages: number;
  
  /**
   * Se existe uma próxima página
   */
  hasNextPage: boolean;
  
  /**
   * Se existe uma página anterior
   */
  hasPreviousPage: boolean;
}

/**
 * Interface genérica para resultados paginados
 */
export interface PaginatedResult<T> {
  /**
   * Dados da página atual
   */
  data: T[];
  
  /**
   * Metadados da paginação
   */
  meta: PaginationMeta;
} 