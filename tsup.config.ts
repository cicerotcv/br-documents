import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'cpf/index': 'src/cpf/index.ts',
    'cpf/validator': 'src/cpf/validator.ts',
    'cpf/masker': 'src/cpf/masker.ts',
    'cpf/generator': 'src/cpf/generator.ts',
    'cnpj/index': 'src/cnpj/index.ts',
    'cnpj/validator': 'src/cnpj/validator.ts',
    'cnpj/masker': 'src/cnpj/masker.ts',
    'cnpj/generator': 'src/cnpj/generator.ts',
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
