import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createStorybookMcpHandler } from '@storybook/mcp';

// biome-ignore lint/style/noDefaultExport: Vercel's fetch handler is a default export.
export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return new Response(null, {
        status: 405,
        headers: { Allow: 'POST', 'Cache-Control': 'no-store' },
      });
    }

    // Vercel can route successive calls to different function instances.
    const handleMcp = await createStorybookMcpHandler({
      manifestProvider: (_request, path) =>
        readFile(join(process.cwd(), 'public', path), 'utf8'),
    });
    const response = await handleMcp(request);
    response.headers.delete('Mcp-Session-Id');
    response.headers.set('Cache-Control', 'no-store');
    return response;
  },
};
