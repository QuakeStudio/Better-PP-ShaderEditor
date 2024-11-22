import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'simple-shader-editor', // Replace it with your extension name
  entry: ['src/index.ts', 'src/index.js'],
  target: ['esnext'],
  format: ['iife'],
  outDir: 'dist',
  banner: {
    // Replace it with your extension's metadata
    js: `// Name: Simple ShaderEditor
// ID: simple-shader-editor
// Description: A Very Simple Shader Editor for Pen+.
// By: Fath11<https://github.com/fath11>
// License: LGPLv3
`
  },
  platform: 'browser',
  clean: true
})
