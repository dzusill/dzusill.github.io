// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Sidebar is generated from each plugin's SUMMARY.md by scripts/migrate-all.mjs.
const sidebar = JSON.parse(
  readFileSync(new URL('./src/sidebar.json', import.meta.url), 'utf8'),
);

// https://astro.build/config
export default defineConfig({
  // dzusill.github.io is a user/org site -> served at the domain root (no `base`).
  site: 'https://dzusill.github.io',
  integrations: [
    starlight({
      title: 'dzusill plugins',
      description: 'Documentation for all dzusill Minecraft plugins',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/dzusill' }],
      customCss: ['./src/styles/custom.css'],
      lastUpdated: true,
      sidebar,
    }),
  ],
});
