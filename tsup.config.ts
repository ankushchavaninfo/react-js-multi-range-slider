import { defineConfig } from "tsup";

export default defineConfig({
  // Each component is its own entry → per-component subpath imports work out of the box
  entry: {
    index: "src/index.ts",
    RangeSlider: "src/components/RangeSlider.tsx",
    SingleSlider: "src/components/SingleSlider.tsx",
    VerticalSlider: "src/components/VerticalSlider.tsx",
    MultiPointSlider: "src/components/MultiPointSlider.tsx",
    CircularSlider: "src/components/CircularSlider.tsx",
  },
  // Dual output: CommonJS for require(), ESM for import + tree-shaking
  format: ["cjs", "esm"],
  // Auto-generate .d.ts from source (no manual maintenance needed)
  dts: true,
  clean: true,
  // React / ReactDOM are NOT bundled — they live in the host app
  external: ["react", "react-dom"],
  // CSS import statemments are converted to runtime <style> injection
  // → no separate .css file needed; styles appear when the component is imported
  injectStyle: true,
  // esbuild tree-shakes exports that are never referenced
  treeshake: true,
  minify: true,
  splitting: false,
  sourcemap: false,
  outDir: "lib",
  // CJS files stay .js; ESM files get .mjs so Node and bundlers can tell them apart
  outExtension: ({ format }) => ({ js: format === "esm" ? ".mjs" : ".js" }),
});
