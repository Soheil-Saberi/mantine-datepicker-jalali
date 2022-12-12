import path from 'path';
import { fileURLToPath } from 'url';
import commonjs from '@rollup/plugin-commonjs';
import nodeExternals from 'rollup-plugin-node-externals';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';

export default {
  input: path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/index.ts'),
  output: {
    format: 'esm',
    externalLiveBindings: false,
    preserveModules: true,
    dir: path.join(path.dirname(fileURLToPath(import.meta.url)), '../dist'),
    sourcemap: 'inline',
  },
  external: ['dayjs'],
  plugins: [
    commonjs(),
    nodeExternals(),
    nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
    esbuild({
      minify: false,
      sourceMap: false,
      tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
    }),
    json(),
    replace({ preventAssignment: true }),
  ],
};
