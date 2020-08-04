export const encodePath = (path?: string): string => (path || '').replace(/\//g, '%2F');
