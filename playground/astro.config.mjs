import integration from 'astro-integration';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [integration()],
});
