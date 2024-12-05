import axios, { type AxiosInstance } from 'axios';
import i18n from '@/configurations/i18n.ts';
import { useUserStore } from '@/stores/user.ts';

let instance: AxiosInstance;
let refresh: Promise<void> | undefined;

export const useAxios = () => {
  if (!instance) {
    const userStore = useUserStore();

    instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    instance.interceptors.request.use((config) => {
      config.headers.set('Accept-Language', i18n.global.locale.value);
      if (userStore.access_token) config.headers.set('Authorization', userStore.access_token);

      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.error(error);

        if (
          axios.isAxiosError(error) &&
          error.config &&
          error.response?.status === 401 &&
          !error.config.__noRefresh
        ) {
          if (!refresh)
            refresh = userStore
              .refreshTokens()
              .catch(() => {
                userStore.updateTokens();
              })
              .finally(() => {
                refresh = undefined;
              });

          await refresh;

          if (userStore.isAuthorized) {
            error.config.headers.set('Authorization', userStore.access_token);
            return axios(error.config);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  return instance;
};
