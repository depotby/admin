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
      users: {
        list: () => axios('/admin/users', { method: 'get' }),
        one: (id) => axios(`/admin/users/${id}`, { method: 'get' }),
      },
      roles: {
        list: () => axios('/admin/roles', { method: 'get' }),
        one: (id) => axios(`/admin/roles/${id}`, { method: 'get' }),
        create: (data) => axios('/admin/roles', { method: 'post', data }),
        update: (id, data) => axios(`/admin/roles/${id}`, { method: 'put', data }),
        destroy: (id) => axios(`/admin/roles/${id}`, { method: 'delete' }),
        switch_ability: (id, ability) =>
          axios(`/admin/roles/${id}/abilities`, { method: 'post', data: { ability } }),
      },
      isAxiosError,
    };
  }

  return instance;
};
