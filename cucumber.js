module.exports = {
  default: `--require-module ts-node/register --require tests/hooks.ts --require tests/steps/**/*.ts --format progress-bar tests/features/**/*.feature --exit`
};
