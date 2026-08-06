import { ModuleMetadata } from '@/types/metadata';
import { ProviderFactory } from '@/providers/ProviderFactory';
import { projectsMetadata, projectsMockData } from './projects';
import { timesheetsMetadata, timesheetsMockData } from './timesheets';
import { employeesMetadata, employeesMockData } from './employees';
import { leavesMetadata, leavesMockData } from './leaves';
import { documentsMetadata, documentsMockData } from './documents';

export const moduleRegistry: Record<string, ModuleMetadata> = {
  projects: projectsMetadata,
  timesheets: timesheetsMetadata,
  employees: employeesMetadata,
  leaves: leavesMetadata,
  documents: documentsMetadata
};

// Initialize ProviderFactory mock data store
ProviderFactory.setMockData('projects', projectsMockData);
ProviderFactory.setMockData('timesheets', timesheetsMockData);
ProviderFactory.setMockData('employees', employeesMockData);
ProviderFactory.setMockData('leaves', leavesMockData);
ProviderFactory.setMockData('documents', documentsMockData);

export function getModuleMetadata(moduleId: string): ModuleMetadata | undefined {
  return moduleRegistry[moduleId];
}
