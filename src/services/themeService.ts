import { ThemePreset, ColorMode } from '@/types/preferences';

export class ThemeService {
  private static THEME_LINK_ID = 'syncfusion-theme-stylesheet';

  public static applyTheme(theme: ThemePreset = 'tailwind', colorMode: ColorMode = 'dark'): void {
    if (typeof window === 'undefined') return;

    let linkElement = document.getElementById(this.THEME_LINK_ID) as HTMLLinkElement;
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.id = this.THEME_LINK_ID;
      linkElement.rel = 'stylesheet';
      document.head.appendChild(linkElement);
    }

    const isDark = colorMode === 'dark';

    const themeUrlMap: Record<string, { light: string; dark: string }> = {
      'tailwind': {
        light: 'https://cdn.syncfusion.com/ej2/24.1.41/tailwind.css?v=2',
        dark: 'https://cdn.syncfusion.com/ej2/24.1.41/tailwind-dark.css?v=2'
      },
      'material': {
        light: 'https://cdn.syncfusion.com/ej2/24.1.41/material.css?v=2',
        dark: 'https://cdn.syncfusion.com/ej2/24.1.41/material-dark.css?v=2'
      },
      'fluent': {
        light: 'https://cdn.syncfusion.com/ej2/24.1.41/fluent.css?v=2',
        dark: 'https://cdn.syncfusion.com/ej2/24.1.41/fluent-dark.css?v=2'
      },
      'bootstrap': {
        light: 'https://cdn.syncfusion.com/ej2/24.1.41/bootstrap5.css?v=2',
        dark: 'https://cdn.syncfusion.com/ej2/24.1.41/bootstrap5-dark.css?v=2'
      }
    };

    const selectedTheme = themeUrlMap[theme] || themeUrlMap['tailwind'];
    linkElement.href = isDark ? selectedTheme.dark : selectedTheme.light;

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
