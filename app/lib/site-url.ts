/** Canonical production URL for sitemap, robots and metadata. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kyrios3d.com").replace(
  /\/$/,
  ""
);
