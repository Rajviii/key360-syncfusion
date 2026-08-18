import { IDataProvider, FetchResult, QueryParams } from '@/types/provider';
import { projectsMockData } from '@/data/modules/projects';
import { timesheetsMockData } from '@/data/modules/timesheets';
import { employeesMockData } from '@/data/modules/employees';
import { leavesMockData } from '@/data/modules/leaves';
import { documentsMockData } from '@/data/modules/documents';
import { projectReviewsMockData } from '@/data/modules/projectReviews';
import { recordingsMockData } from '@/data/modules/recordings';
import { opportunitiesMockData } from '@/data/modules/opportunities';

export class MockProvider implements IDataProvider {
  id = 'mock';
  name = 'Mock Data Provider';
  type: 'mock' = 'mock';

  private datasets: Map<string, any[]> = new Map();

  constructor(initialDataMap?: Record<string, any[]>) {
    if (initialDataMap) {
      Object.entries(initialDataMap).forEach(([moduleId, data]) => {
        this.datasets.set(moduleId, [...data]);
      });
    }
    this.seedDefaults();
  }

  private seedDefaults() {
    if (!this.datasets.has('projects') || this.datasets.get('projects')?.length === 0) {
      this.datasets.set('projects', [...projectsMockData]);
    }
    if (!this.datasets.has('timesheets') || this.datasets.get('timesheets')?.length === 0) {
      this.datasets.set('timesheets', [...timesheetsMockData]);
    }
    if (!this.datasets.has('employees') || this.datasets.get('employees')?.length === 0) {
      this.datasets.set('employees', [...employeesMockData]);
    }
    if (!this.datasets.has('leaves') || this.datasets.get('leaves')?.length === 0) {
      this.datasets.set('leaves', [...leavesMockData]);
    }
    if (!this.datasets.has('documents') || this.datasets.get('documents')?.length === 0) {
      this.datasets.set('documents', [...documentsMockData]);
    }
    if (!this.datasets.has('project-reviews') || this.datasets.get('project-reviews')?.length === 0) {
      this.datasets.set('project-reviews', [...projectReviewsMockData]);
    }
    if (!this.datasets.has('recordings') || this.datasets.get('recordings')?.length === 0) {
      this.datasets.set('recordings', [...recordingsMockData]);
    }
    if (!this.datasets.has('opportunities') || this.datasets.get('opportunities')?.length === 0) {
      this.datasets.set('opportunities', [...opportunitiesMockData]);
    }
  }

  public registerModuleData(moduleId: string, data: any[]) {
    this.datasets.set(moduleId, [...data]);
  }

  async fetchData<T = any>(moduleId: string, viewId: string, params: QueryParams = {}): Promise<FetchResult<T>> {
    const startTime = performance.now();

    if (!this.datasets.has(moduleId) || (this.datasets.get(moduleId)?.length === 0)) {
      this.seedDefaults();
    }

    let records = [...(this.datasets.get(moduleId) || [])];

    // Check if recordings data in dataset is outdated (old schema missing code)
    if (moduleId === 'recordings' && records.length > 0 && !records[0].code) {
      records = [...recordingsMockData];
      this.datasets.set('recordings', records);
    }

    // 1. Search Query Filter
    if (params.searchQuery) {
      const q = params.searchQuery.toLowerCase();
      records = records.filter(item =>
        Object.values(item).some(val =>
          val !== null && val !== undefined && String(val).toLowerCase().includes(q)
        )
      );
    }

    // 2. Sorting
    if (params.sortBy) {
      const key = params.sortBy;
      const order = params.sortOrder === 'desc' ? -1 : 1;
      records.sort((a, b) => {
        if (a[key] < b[key]) return -1 * order;
        if (a[key] > b[key]) return 1 * order;
        return 0;
      });
    }

    const totalRecords = records.length;

    // 3. Pagination
    const page = params.page || 1;
    const pageSize = params.pageSize || 25;
    const start = (page - 1) * pageSize;
    const paginatedData = records.slice(start, start + pageSize);

    const endTime = performance.now();
    const latencyMs = Math.round(endTime - startTime);

    return {
      data: paginatedData as T[],
      totalRecords,
      page,
      pageSize,
      latencyMs
    };
  }

  async createRecord<T = any>(moduleId: string, record: Partial<T>): Promise<T> {
    const current = this.datasets.get(moduleId) || [];
    const newRecord = { id: Date.now(), ...record } as T;
    this.datasets.set(moduleId, [newRecord, ...current]);
    return newRecord;
  }

  async updateRecord<T = any>(moduleId: string, id: string | number, record: Partial<T>): Promise<T> {
    const current = this.datasets.get(moduleId) || [];
    const index = current.findIndex(item => item.id == id);
    if (index === -1) throw new Error(`Record with ID ${id} not found in ${moduleId}`);
    const updated = { ...current[index], ...record };
    current[index] = updated;
    this.datasets.set(moduleId, current);
    return updated;
  }

  async deleteRecord(moduleId: string, id: string | number): Promise<boolean> {
    const current = this.datasets.get(moduleId) || [];
    const filtered = current.filter(item => item.id != id);
    this.datasets.set(moduleId, filtered);
    return true;
  }
}
