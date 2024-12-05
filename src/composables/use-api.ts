import { isAxiosError } from 'axios';
import { useAxios } from '@/composables/use-axios.ts';
import type { Api } from '@/types/composables/use-api.ts';

let instance: Api;

export const useApi = () => {
  if (!instance) {
    const axios = useAxios();

    instance = {
      authentications: {
        create: (data) =>
          axios('/admin/authentications', { method: 'post', data, __noRefresh: true }),
        refresh: (data) =>
          axios('/admin/authentications', { method: 'put', data, __noRefresh: true }),
      },
      user: {
        info: () => axios('/admin/user', { method: 'get' }),
      },
      isAxiosError,
    };
  }

  return instance;
};
