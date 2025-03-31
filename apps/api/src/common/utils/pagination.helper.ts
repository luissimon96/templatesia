import { PaginatedResult } from '../interfaces/paginated-result.interface';

/**
 * Default pagination parameters
 */
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_NUMBER = 1;

/**
 * Interface for pagination query parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Helper class for handling pagination
 */
export class PaginationHelper {
  /**
   * Creates a pagination object based on the given parameters
   * 
   * @param params - Pagination parameters (page, limit)
   * @returns Pagination configuration with skip and take values
   */
  static getPaginationConfig(params: PaginationParams): { skip: number; take: number } {
    const page = params.page && params.page > 0 ? params.page : DEFAULT_PAGE_NUMBER;
    const limit = params.limit && params.limit > 0 ? params.limit : DEFAULT_PAGE_SIZE;

    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }

  /**
   * Creates a paginated result object
   * 
   * @param data - The data for the current page
   * @param total - The total number of items
   * @param params - The pagination parameters used
   * @returns A paginated result object
   */
  static createPaginatedResult<T>(
    data: T[],
    total: number,
    params: PaginationParams,
  ): PaginatedResult<T> {
    const page = params.page && params.page > 0 ? params.page : DEFAULT_PAGE_NUMBER;
    const limit = params.limit && params.limit > 0 ? params.limit : DEFAULT_PAGE_SIZE;
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
} 