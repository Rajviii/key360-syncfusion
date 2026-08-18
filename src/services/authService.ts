import { User, Site, Organization, DataZone, Portal } from '@/types/auth';

const STORAGE_KEYS = {
  IS_AUTH: 'key360_is_authenticated',
  USER: 'key360_auth_user',
  SELECTED_SITE_ID: 'key360_selected_site_id',
  REMEMBERED_SITE_ID: 'key360_remembered_site_id'
};

export const MOCK_USER: User = {
  id: 'user-001',
  name: 'Rajvi Prajapati',
  email: 'rajvi.prajapati@key360.com',
  initials: 'RP',
  role: 'Enterprise Administrator'
};

export const MOCK_ORGANIZATIONS: Organization[] = [
  { id: 'india-dev', name: 'India Development', code: 'IND-DEV' },
  { id: 'acme-corp', name: 'Global Enterprise', code: 'GLOBAL' },
  { id: 'key360-trg', name: 'Training Organization', code: 'TRG' }
];

export const MOCK_ORGANIZATION: Organization = MOCK_ORGANIZATIONS[0];

export const MOCK_DATA_ZONES: DataZone[] = [
  { id: 'ops-zone', code: '01 - OPERATIONS', name: 'Operations & Enterprise Controls', region: 'ap-south-1', organizationId: 'india-dev' },
  { id: 'proj-zone', code: '02 - PROJECTS', name: 'Capital Projects & Execution', region: 'ap-south-1', organizationId: 'india-dev' },
  { id: 'trg-zone', code: '03 - KEY360 TRAINING', name: 'Sandbox & Training Zone', region: 'ap-south-1', organizationId: 'india-dev' },
  { id: 'na-east', code: '01 - NA OPERATIONS', name: 'North America East Operations', region: 'us-east-1', organizationId: 'acme-corp' },
  { id: 'eu-west', code: '02 - EU PROJECTS', name: 'Europe West Execution Zone', region: 'eu-west-1', organizationId: 'acme-corp' }
];

export const MOCK_PORTALS: Portal[] = [
  { id: 'crm-actions', code: '001 - CRM & Actions', name: 'CRM & Enterprise Actions Portal', description: 'Enterprise Operations, Timesheets, Employees & CRM Hub', dataZoneId: 'ops-zone' },
  { id: 'trial-proj', code: '001 - Trial Project', name: 'Trial Execution & Planning Hub', description: 'Gantt WBS, Task Kanban & Milestone Tracking', dataZoneId: 'proj-zone' },
  { id: 'sandpit', code: '004 - Sandpit', name: 'Innovation & Sandbox Portal', description: 'Experimental Schema & Document Registers', dataZoneId: 'proj-zone' },
  { id: 'trg-portal', code: '001 - Training Portal', name: 'KEY360 Onboarding & Learning Hub', description: 'Staff Training & Knowledge Base', dataZoneId: 'trg-zone' },
  { id: 'ent-portal', code: '001 - Global Hub', name: 'KEY360 Enterprise Portal', description: 'Global Headquarters Operations', dataZoneId: 'na-east' }
];

export const MOCK_PORTAL: Portal = MOCK_PORTALS[0];

export const MOCK_SITES: Site[] = [
  {
    id: 'crm-actions',
    name: '001 - CRM & Actions',
    location: 'India Development / 01 - OPERATIONS',
    lastAccessed: 'Today, 10:30 AM',
    organizationId: 'india-dev',
    dataZoneId: 'ops-zone',
    portalId: 'crm-actions'
  },
  {
    id: 'trial-proj',
    name: '001 - Trial Project',
    location: 'India Development / 02 - PROJECTS',
    lastAccessed: 'Yesterday',
    organizationId: 'india-dev',
    dataZoneId: 'proj-zone',
    portalId: 'trial-proj'
  },
  {
    id: 'sandpit',
    name: '004 - Sandpit',
    location: 'India Development / 02 - PROJECTS',
    lastAccessed: '2 days ago',
    organizationId: 'india-dev',
    dataZoneId: 'proj-zone',
    portalId: 'sandpit'
  },
  {
    id: 'trg-portal',
    name: '001 - Training Portal',
    location: 'India Development / 03 - KEY360 TRAINING',
    lastAccessed: '5 days ago',
    organizationId: 'india-dev',
    dataZoneId: 'trg-zone',
    portalId: 'trg-portal'
  },
  {
    id: 'head-office',
    name: '001 - Global Hub',
    location: 'Global Enterprise / 01 - NA OPERATIONS',
    lastAccessed: '1 week ago',
    organizationId: 'acme-corp',
    dataZoneId: 'na-east',
    portalId: 'ent-portal'
  }
];

export class AuthService {
  /**
   * Simulates authentication network call
   */
  static async authenticate(email: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 600));

    if (!email || !password || !email.includes('@') || password.length < 3) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    const user: User = {
      ...MOCK_USER,
      email: email,
      name: email.split('@')[0].split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ') || MOCK_USER.name,
      initials: (email.charAt(0) + (email.split('@')[0].split('.')[1]?.charAt(0) || 'P')).toUpperCase()
    };

    return user;
  }

  /**
   * Simulates Microsoft SSO OAuth login
   */
  static async authenticateWithMicrosoft(): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_USER;
  }

  /**
   * Fetches available sites for the user/organization
   */
  static async getAvailableSites(): Promise<Site[]> {
    return MOCK_SITES;
  }

  /**
   * Validates if a remembered site ID exists in available sites list
   */
  static validateRememberedSite(sites: Site[], siteId: string | null): Site | null {
    if (!siteId) return null;
    return sites.find(s => s.id === siteId) || null;
  }

  /**
   * Restores session state from storage
   */
  static restoreSession(): {
    isAuthenticated: boolean;
    user: User | null;
    selectedSite: Site | null;
    rememberedSiteId: string | null;
  } {
    if (typeof window === 'undefined') {
      return { isAuthenticated: false, user: null, selectedSite: null, rememberedSiteId: null };
    }

    try {
      const isAuth = localStorage.getItem(STORAGE_KEYS.IS_AUTH) === 'true';
      const storedUserJson = localStorage.getItem(STORAGE_KEYS.USER);
      const user = storedUserJson ? JSON.parse(storedUserJson) : (isAuth ? MOCK_USER : null);

      const rememberedSiteId = localStorage.getItem(STORAGE_KEYS.REMEMBERED_SITE_ID);
      const selectedSiteId = localStorage.getItem(STORAGE_KEYS.SELECTED_SITE_ID);

      const siteToValidate = selectedSiteId || rememberedSiteId;
      const selectedSite = AuthService.validateRememberedSite(MOCK_SITES, siteToValidate);

      return {
        isAuthenticated: isAuth,
        user: isAuth ? user : null,
        selectedSite: isAuth ? selectedSite : null,
        rememberedSiteId
      };
    } catch {
      return { isAuthenticated: false, user: null, selectedSite: null, rememberedSiteId: null };
    }
  }

  /**
   * Saves auth session to storage
   */
  static saveAuthSession(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'true');
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  /**
   * Saves site selection to storage
   */
  static saveSiteSelection(site: Site | null, remember: boolean): void {
    if (typeof window === 'undefined') return;
    if (site) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_SITE_ID, site.id);
      if (remember) {
        localStorage.setItem(STORAGE_KEYS.REMEMBERED_SITE_ID, site.id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.REMEMBERED_SITE_ID);
      }
    } else {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_SITE_ID);
    }
  }

  /**
   * Clears current site selection (e.g. for Switch Site)
   */
  static clearSiteSelection(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.SELECTED_SITE_ID);
  }

  /**
   * Clears authentication session (logout)
   */
  static clearSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.IS_AUTH);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_SITE_ID);
  }
}
