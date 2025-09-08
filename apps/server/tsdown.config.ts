import { defineConfig } from "tsdown";

export default defineConfig({
	entry: "./src/index.ts",
	outDir: "build",
	platform: "node",
	minify: true,
	format: "esm",
	sourcemap: true,
});
