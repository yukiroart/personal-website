import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'y0rudiy0',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  project: {
    basePath: '/studio',
  },
});
