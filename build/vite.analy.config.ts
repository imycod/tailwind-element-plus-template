
import {defineConfig, loadEnv} from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import {alias} from "./utils";
import {createVitePlugins} from "./plugins.ts";

export default defineConfig((mode)=>{
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    plugins: [
      ...createVitePlugins(env),
      analyzer()
    ],
    resolve: {
      alias
    },
  }
})
