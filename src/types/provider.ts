export interface QueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  searchQuery?: string;
  filters?: Record<string, any>;
  groupBy?: string;
}

export interface AggregateResult {
  field: string;
  type: 'sum' | 'count' | 'average' | 'min' | 'max';
  value: number;
}

export interface FetchResult<T = any> {
  data: T[];
  totalRecords: number;
  page: number;
  pageSize: number;
  aggregates?: Record<string, number>;
  latencyMs?: number;
}

export interface IDataProvider {
  id: string;
  name: string;
  type: 'mock' | 'rest' | 'mcp';
  fetchData<T = any>(moduleId: string, viewId: string, params?: QueryParams): Promise<FetchResult<T>>;
  createRecord<T = any>(moduleId: string, record: Partial<T>): Promise<T>;
  updateRecord<T = any>(moduleId: string, id: string | number, record: Partial<T>): Promise<T>;
  deleteRecord(moduleId: string, id: string | number): Promise<boolean>;
}
