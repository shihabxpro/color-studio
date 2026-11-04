/**
 * Prefixes root-relative paths with Astro's configured `BASE_URL` so all
 * internal routes and public assets work seamlessly both at `/` (local dev or
 * root domain) and under `/<repo-name>` on GitHub Pages.
 */
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) {
    return path;
  }

  const rawBase = import.meta.env.BASE_URL || '/';
  const normalizedBase =
    rawBase === '/' ? '' : rawBase.replace(/\/+$/, '');

  if (!normalizedBase) {
    return path;
  }

  if (path === normalizedBase || path.startsWith(`${normalizedBase}/`)) {
    return path;
  }

  return path === '/' ? `${normalizedBase}/` : `${normalizedBase}${path}`;
}
