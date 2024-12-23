/// <reference types="vite/client" />

import 'vue-router';
import 'axios';
import type { AbilityName } from '@/types/models/ability.ts';

declare module 'vue-router' {
  interface RouteMeta {
    layout: 'authentication' | 'default';
    authentication?: true;
    ability?: AbilityName;
  }
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    __noRefresh?: boolean;
  }
}
