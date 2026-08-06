import { IDataProvider } from '@/types/provider';
import { MockProvider } from './MockProvider';
import { RestProvider } from './RestProvider';
import { McpProvider } from './McpProvider';

export class ProviderFactory {
  private static mockInstance: MockProvider = new MockProvider();
  private static restInstance: RestProvider = new RestProvider();
  private static mcpInstance: McpProvider = new McpProvider();
  private static activeType: 'mock' | 'rest' | 'mcp' = 'mock';

  public static setMockData(moduleId: string, data: any[]) {
    this.mockInstance.registerModuleData(moduleId, data);
  }

  public static setActiveProviderType(type: 'mock' | 'rest' | 'mcp') {
    this.activeType = type;
  }

  public static getActiveProviderType(): 'mock' | 'rest' | 'mcp' {
    return this.activeType;
  }

  public static getProvider(type?: 'mock' | 'rest' | 'mcp'): IDataProvider {
    const target = type || this.activeType;
    switch (target) {
      case 'rest':
        return this.restInstance;
      case 'mcp':
        return this.mcpInstance;
      case 'mock':
      default:
        return this.mockInstance;
    }
  }
}
