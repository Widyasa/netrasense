// Metro config for pnpm monorepo: allows importing workspace packages
// and resolving modules hoisted to the repo root node_modules.
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch the whole monorepo so changes in workspace packages are picked up.
config.watchFolders = [workspaceRoot];

// Resolve modules from both the app's own node_modules and the root's,
// which is where pnpm hoists shared dependencies.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// pnpm uses symlinks for workspace packages; Metro needs this enabled
// to follow them out of the project root.
config.resolver.unstable_enableSymlinks = true;
config.resolver.disableHierarchicalLookup = false;

module.exports = config;
