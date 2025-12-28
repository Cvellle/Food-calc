import {execSync} from 'child_process';

const useCases = [
  'main',
  'locale-prefix-never',
  'trailing-slash',
  'base-path',
  'domains',
  'locale-cookie-false'
];

for (const useCase of useCases) {
  console.log(`Running tests for use case: ${useCase}`);

  try {
    // Build with NEXT_PUBLIC_USE_CASE set
    execSync(`cross-env NEXT_PUBLIC_USE_CASE=${useCase} pnpm build`, {
      stdio: 'inherit'
    });

    // Run playwright tests for the use case spec file
    execSync(
      `cross-env NEXT_PUBLIC_USE_CASE=${useCase} TEST_MATCH=${useCase}.spec.ts playwright test`,
      {stdio: 'inherit'}
    );
  } catch (error) {
    console.error(`Tests failed for use case: ${useCase}`);
    process.exit(1);
  }
}
