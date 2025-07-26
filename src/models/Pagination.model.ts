export interface PaginatedResponse<T> {
  page: number;
  items: T[];
  count: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  [key: string]: any;
} 