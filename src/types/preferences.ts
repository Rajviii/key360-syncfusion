export type ThemePreset = 'tailwind' | 'material' | 'fluent' | 'bootstrap';
export type ColorMode = 'dark' | 'light';
export type DensityType = 'comfortable' | 'compact';

export interface UIPreferences {
  theme: ThemePreset;
  colorMode: ColorMode;
  density: DensityType;
  defaultPageSize: number;
  language: string;
  sidebarOpen: boolean;
}

export interface UIPreferencesContextType {
  preferences: UIPreferences;
  setTheme: (theme: ThemePreset) => void;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  setDensity: (density: DensityType) => void;
  setDefaultPageSize: (size: number) => void;
  toggleSidebar: () => void;
}
