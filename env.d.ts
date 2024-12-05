/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    __noRefresh?: boolean;
  }
}
