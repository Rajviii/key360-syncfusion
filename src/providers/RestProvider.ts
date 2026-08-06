import { IDataProvider, FetchResult, QueryParams } from '@/types/provider';

export class RestProvider implements IDataProvider {
  id = 'rest';
  name = '.NET Web API / REST Provider';
  type: 'rest' = 'rest';

  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async fetchData<T = any>(moduleId: string, viewId: string, params: QueryParams = {}): Promise<FetchResult<T>> {
    const startTime = performance.now();
    const query = new URLSearchParams();
    if (params.page) query.append('$page', String(params.page));
    if (params.pageSize) query.append('$top', String(params.pageSize));
    if (params.sortBy) query.append('$orderby', `${params.sortBy} ${params.sortOrder || 'asc'}`);
    if (params.searchQuery) query.append('$search', params.searchQuery);

    try {
      const response = await fetch(`${this.baseUrl}/${moduleId}?${query.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      const json = await response.json();
      const endTime = performance.now();
      return {
        data: json.items || json.data || json,
        totalRecords: json.total || json.count || (json.items ? json.items.length : 0),
        page: params.page || 1,
        pageSize: params.pageSize || 25,
        latencyMs: Math.round(endTime - startTime)
      };
    } catch (err) {
      console.warn(`.NET REST API unreachable (${moduleId}), falling back to simulated REST response.`);
      return {
        data: [],
        totalRecords: 0,
        page: 1,
        pageSize: 25,
        latencyMs: Math.round(performance.now() - startTime)
      };
    }
  }

  async createRecord<T = any>(moduleId: string, record: Partial<T>): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${moduleId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    return res.json();
  }

  async updateRecord<T = any>(moduleId: string, id: string | number, record: Partial<T>): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${moduleId}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    return res.json();
  }

  async deleteRecord(moduleId: string, id: string | number): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}/${moduleId}/${id}`, { method: 'DELETE' });
    return res.ok;
  }
}
