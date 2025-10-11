import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Prerender only the home page
  { path: '', renderMode: RenderMode.Prerender },
  // Dynamic routes should not be prerendered without params; render on server instead
  { path: 'portfolio/:category', renderMode: RenderMode.Server },
  // Fallback to server rendering for any other routes
  { path: '**', renderMode: RenderMode.Server }
];
