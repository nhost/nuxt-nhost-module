import path from 'path';
import { Module } from '@nuxt/types';
import type { createClient, UserConfig } from 'nhost-js-sdk';
import { resolve, join } from 'path'

declare module 'vue/types/vue' {
  interface Vue {
    $nhost: ReturnType<typeof createClient>
    nhostAuth: boolean|'guest';
  }
}

declare module '@nuxt/types' {
  interface Context {
    $nhost: ReturnType<typeof createClient> & {
      $options: {
        routes: {
          home: string|false|undefined;
          login: string|false|undefined;
          logout: string|false|undefined;
        }
      }
    }
  }
}

type Options = UserConfig;

const nhostModule: Module<Options> = function(options) {
  this.addPlugin({
    src: path.resolve(__dirname, '../templates/plugin.js'),
    options: {
      ...options,
      ...this.options.nhost,
    }
  });

  this.options.alias['~nhost/auth-middleware'] = resolve(__dirname, 'authMiddleware');
  this.options.build.transpile?.push(__dirname);
};

export const meta = require('../package.json');

export default nhostModule;
