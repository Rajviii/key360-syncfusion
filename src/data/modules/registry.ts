import { ModuleMetadata } from '@/types/metadata';
import { ProviderFactory } from '@/providers/ProviderFactory';
import { projectsMetadata, projectsMockData } from './projects';
import { timesheetsMetadata, timesheetsMockData } from './timesheets';
import { employeesMetadata, employeesMockData } from './employees';
import { leavesMetadata, leavesMockData } from './leaves';
import { documentsMetadata, documentsMockData } from './documents';
import { projectReviewsMetadata, projectReviewsMockData } from './projectReviews';
import { recordingsMetadata, recordingsMockData } from './recordings';
import { opportunitiesMetadata, opportunitiesMockData } from './opportunities';

export const moduleRegistry: Record<string, ModuleMetadata> = {
  projects: projectsMetadata,
  timesheets: timesheetsMetadata,
  employees: employeesMetadata,
  leaves: leavesMetadata,
  documents: documentsMetadata,
  'project-reviews': projectReviewsMetadata,
  recordings: recordingsMetadata,
  opportunities: opportunitiesMetadata
};

// Initialize ProviderFactory mock data store
ProviderFactory.setMockData('projects', projectsMockData);
ProviderFactory.setMockData('timesheets', timesheetsMockData);
ProviderFactory.setMockData('employees', employeesMockData);
ProviderFactory.setMockData('leaves', leavesMockData);
ProviderFactory.setMockData('documents', documentsMockData);
ProviderFactory.setMockData('project-reviews', projectReviewsMockData);
ProviderFactory.setMockData('recordings', recordingsMockData);
ProviderFactory.setMockData('opportunities', opportunitiesMockData);

export function getModuleMetadata(moduleId: string): ModuleMetadata | undefined {
  return moduleRegistry[moduleId];
}

