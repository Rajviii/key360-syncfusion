import { IDataProvider, FetchResult, QueryParams } from '@/types/provider';

export class McpProvider implements IDataProvider {
  id = 'mcp';
  name = 'MCP Protocol Endpoint';
  type: 'mcp' = 'mcp';

  async fetchData<T = any>(moduleId: string, viewId: string, params: QueryParams = {}): Promise<FetchResult<T>> {
    const startTime = performance.now();
    try {
      const response = await fetch(`/api/mcp/tools/get_${moduleId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ arguments: params })
      });
      if (!response.ok) throw new Error(`MCP Error ${response.status}`);
      const json = await response.json();
      return {
        data: json.content || [],
        totalRecords: (json.content || []).length,
        page: params.page || 1,
        pageSize: params.pageSize || 25,
        latencyMs: Math.round(performance.now() - startTime)
      };
    } catch {
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
    const res = await fetch(`/api/mcp/tools/create_${moduleId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ arguments: record })
    });
    return res.json();
  }

  async updateRecord<T = any>(moduleId: string, id: string | number, record: Partial<T>): Promise<T> {
    const res = await fetch(`/api/mcp/tools/update_${moduleId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ arguments: { id, ...record } })
    });
    return res.json();
  }

  async deleteRecord(moduleId: string, id: string | number): Promise<boolean> {
    const res = await fetch(`/api/mcp/tools/delete_${moduleId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ arguments: { id } })
    });
    return res.ok;
  }
}
