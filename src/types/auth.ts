export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarUrl?: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface Organization {
  id: string;
  name: string;
  code: string;
}

export interface DataZone {
  id: string;
  code: string;
  name: string;
  region: string;
  organizationId: string;
}

export interface Portal {
  id: string;
  code: string;
  name: string;
  description?: string;
  dataZoneId: string;
}

export interface Site {
  id: string;
  name: string;
  location: string;
  lastAccessed: string;
  organizationId: string;
  dataZoneId: string;
  portalId: string;
}

export interface WorkspaceContextState {
  organization: Organization | null;
  dataZone: DataZone | null;
  portal: Portal | null;
  selectedSite: Site | null;
  rememberedSiteId: string | null;
  sites: Site[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  selectedSite: Site | null;
  sites: Site[];
  organizations: Organization[];
  dataZones: DataZone[];
  portals: Portal[];
  organization: Organization | null;
  dataZone: DataZone | null;
  portal: Portal | null;
  isLoading: boolean;
  error: string | null;
  rememberedSiteId: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithMicrosoft: () => Promise<boolean>;
  selectSite: (siteId: string, remember: boolean) => void;
  selectWorkspaceContext: (orgId: string, dataZoneId: string, portalId: string, remember?: boolean) => void;
  switchSite: () => void;
  logout: () => void;
  clearError: () => void;
}

