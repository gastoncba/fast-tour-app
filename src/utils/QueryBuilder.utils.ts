/**
 * Clase utilitaria para construir queries de manera consistente
 * 
 * @example
 * // Query paginada con filtros
 * const query = QueryBuilder.buildPaginatedQuery(1, 10, 'name=paris&minPrice=100');
 * // Resultado: "page=1&limit=10&name=paris&minPrice=100"
 * 
 * // Query paginada con objeto de filtros
 * const query = QueryBuilder.buildPaginatedQuery(1, 10, { name: 'paris', minPrice: 100 });
 * // Resultado: "page=1&limit=10&name=paris&minPrice=100"
 * 
 * // Query simple
 * const query = QueryBuilder.buildQuery({ name: 'paris', countryId: 1 });
 * // Resultado: "name=paris&countryId=1"
 */
export class QueryBuilder {
  /**
   * Construye una query string para endpoints paginados
   * @param page - Número de página
   * @param limit - Elementos por página
   * @param filters - Filtros adicionales como string o objeto
   * @returns Query string formateada
   */
  static buildPaginatedQuery(
    page: number = 1,
    limit: number = 10,
    filters?: string | Record<string, any>
  ): string {
    const queryParams = new URLSearchParams();
    
    // Agregar parámetros de paginación
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    
    // Procesar filtros si existen
    if (filters) {
      if (typeof filters === 'string') {
        // Si es un string, parsearlo y agregar cada parámetro individualmente
        const params = new URLSearchParams(filters);
        params.forEach((value, key) => {
          queryParams.append(key, value);
        });
      } else if (typeof filters === 'object') {
        // Si es un objeto, convertir cada propiedad en parámetro
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value.toString());
          }
        });
      }
    }
    
    return queryParams.toString();
  }

  /**
   * Construye una query string simple para filtros
   * @param filters - Filtros como string o objeto
   * @returns Query string formateada
   */
  static buildQuery(filters?: string | Record<string, any>): string {
    if (!filters) return '';
    
    if (typeof filters === 'string') {
      return filters;
    }
    
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    return queryParams.toString();
  }

  /**
   * Construye un objeto de filtros a partir de un string
   * @param queryString - String de query
   * @returns Objeto con los filtros
   */
  static parseQueryString(queryString: string): Record<string, string> {
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};
    
    params.forEach((value, key) => {
      result[key] = value;
    });
    
    return result;
  }

  /**
   * Construye un string de query a partir de un objeto
   * @param filters - Objeto con filtros
   * @returns String de query
   */
  static buildQueryString(filters: Record<string, any>): string {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    return queryParams.toString();
  }
} 