import { request } from '@playwright/test';

async function runSmokeTestOrFail(baseUrl: string) {
  const context = await request.newContext();

  try {
    const response = await context.get(baseUrl);
    if (response.status() !== 200) {
      throw new Error(`Base URL ${baseUrl} returned status ${response.status()}. Is the application running?`);
    }

    console.log(`Base URL ${baseUrl} is accessible.`);
  } catch (error) {
    console.error(
      `Error accessing Base URL ${baseUrl}:`,
      error,
      `\n\nIs the application running on the following URL?\n${baseUrl}\n`
    );
    process.exit(1);
  }
}

export default runSmokeTestOrFail;
