export interface SiteEntry {
  key: string;
  route: string;
  input: string;
}

export const siteEntries: readonly SiteEntry[];
export const siteRoutes: readonly string[];
export const viteInputs: Record<string, string>;
