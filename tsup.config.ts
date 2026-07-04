import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'cpf/index': 'src/cpf/index.ts',
    'cpf/validator': 'src/cpf/validator.ts',
    'cpf/masker': 'src/cpf/masker.ts',
    'cpf/generator': 'src/cpf/generator.ts',
  },
  format: ['esm'],
  dts: true,
  treeshake: true,
  splitting: false,
  clean: true,
  sourcemap: true,
  minify: true,
  target: 'es2022',
  platform: 'neutral',
  outDir: 'dist',
});
