'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Site, Organization, DataZone, Portal, AuthContextType } from '@/types/auth';
import {
  AuthService,
  MOCK_ORGANIZATIONS,
  MOCK_DATA_ZONES,
  MOCK_PORTALS,
  MOCK_SITES
} from '@/services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [rememberedSiteId, setRememberedSiteId] = useState<string | null>(null);
  const [sites] = useState<Site[]>(MOCK_SITES);

  // KEY360 Organizational hierarchy states
  const [organizations] = useState<Organization[]>(MOCK_ORGANIZATIONS);
  const [dataZones] = useState<DataZone[]>(MOCK_DATA_ZONES);
  const [portals] = useState<Portal[]>(MOCK_PORTALS);

  const [organization, setOrganization] = useState<Organization | null>(MOCK_ORGANIZATIONS[0]);
  const [dataZone, setDataZone] = useState<DataZone | null>(MOCK_DATA_ZONES[0]);
  const [portal, setPortal] = useState<Portal | null>(MOCK_PORTALS[0]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Restore session on mount
  useEffect(() => {
    const session = AuthService.restoreSession();
    setIsAuthenticated(session.isAuthenticated);
    setUser(session.user);
    setSelectedSite(session.selectedSite);
    setRememberedSiteId(session.rememberedSiteId);

    if (session.selectedSite) {
      const org = MOCK_ORGANIZATIONS.find(o => o.id === session.selectedSite?.organizationId) || MOCK_ORGANIZATIONS[0];
      const dz = MOCK_DATA_ZONES.find(d => d.id === session.selectedSite?.dataZoneId) || MOCK_DATA_ZONES[0];
      const p = MOCK_PORTALS.find(pr => pr.id === session.selectedSite?.portalId) || MOCK_PORTALS[0];
      setOrganization(org);
      setDataZone(dz);
      setPortal(p);
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const loggedUser = await AuthService.authenticate(email, password);
      setUser(loggedUser);
      setIsAuthenticated(true);
      AuthService.saveAuthSession(loggedUser);

      if (rememberedSiteId) {
        const validSite = AuthService.validateRememberedSite(sites, rememberedSiteId);
        if (validSite) {
          setSelectedSite(validSite);
          AuthService.saveSiteSelection(validSite, true);
        }
      }

      setIsLoading(false);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
      setIsLoading(false);
      return false;
    }
  };

  const loginWithMicrosoft = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const loggedUser = await AuthService.authenticateWithMicrosoft();
      setUser(loggedUser);
      setIsAuthenticated(true);
      AuthService.saveAuthSession(loggedUser);

      if (rememberedSiteId) {
        const validSite = AuthService.validateRememberedSite(sites, rememberedSiteId);
        if (validSite) {
          setSelectedSite(validSite);
          AuthService.saveSiteSelection(validSite, true);
        }
      }

      setIsLoading(false);
      return true;
    } catch (err: any) {
      setError(err.message || 'Microsoft Sign-In failed');
      setIsLoading(false);
      return false;
    }
  };

  const selectSite = (siteId: string, remember: boolean) => {
    const site = sites.find(s => s.id === siteId) || null;
    setSelectedSite(site);
    if (site) {
      const org = organizations.find(o => o.id === site.organizationId) || null;
      const dz = dataZones.find(d => d.id === site.dataZoneId) || null;
      const p = portals.find(pr => pr.id === site.portalId) || null;
      if (org) setOrganization(org);
      if (dz) setDataZone(dz);
      if (p) setPortal(p);
      if (remember) {
        setRememberedSiteId(site.id);
      }
    }
    AuthService.saveSiteSelection(site, remember);
  };

  const selectWorkspaceContext = (orgId: string, dataZoneId: string, portalId: string, remember: boolean = true) => {
    const org = organizations.find(o => o.id === orgId) || organizations[0];
    const dz = dataZones.find(d => d.id === dataZoneId) || dataZones[0];
    const p = portals.find(pr => pr.id === portalId) || portals[0];

    setOrganization(org);
    setDataZone(dz);
    setPortal(p);

    let matchedSite = sites.find(s => s.portalId === p.id && s.dataZoneId === dz.id);
    if (!matchedSite) {
      matchedSite = {
        id: p.id,
        name: p.code || p.name,
        location: `${org.name} / ${dz.code || dz.name}`,
        lastAccessed: 'Just now',
        organizationId: org.id,
        dataZoneId: dz.id,
        portalId: p.id
      };
    }

    setSelectedSite(matchedSite);
    AuthService.saveSiteSelection(matchedSite, remember);
  };

  const switchSite = () => {
    setSelectedSite(null);
    AuthService.clearSiteSelection();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setSelectedSite(null);
    setError(null);
    AuthService.clearSession();
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        selectedSite,
        sites,
        organizations,
        dataZones,
        portals,
        organization,
        dataZone,
        portal,
        isLoading,
        error,
        rememberedSiteId,
        login,
        loginWithMicrosoft,
        selectSite,
        selectWorkspaceContext,
        switchSite,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
