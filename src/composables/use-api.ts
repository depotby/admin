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
          axios('/admin/authentications/refresh', { method: 'post', data, __noRefresh: true }),
        destroy: () => axios('/admin/authentications', { method: 'delete' }),
      },
      user: {
        info: () => axios('/admin/user', { method: 'get' }),
      },
      users: {
        list: (params) => axios('/admin/users', { method: 'get', params }),
        one: (id) => axios(`/admin/users/${id}`, { method: 'get' }),
        switch_type: (id) => axios(`/admin/users/${id}/switch-type`, { method: 'post' }),
        switch_role: (id, role_id) =>
          axios(`/admin/users/${id}/roles/${role_id}`, { method: 'post' }),
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
      categories: {
        list: (params) => axios('/admin/categories', { method: 'get', params }),
        one: (id) => axios(`/admin/categories/${id}`, { method: 'get' }),
        create: (data) => axios('/admin/categories', { method: 'post', data }),
        update: (id, data) => axios(`/admin/categories/${id}`, { method: 'put', data }),
        destroy: (id) => axios(`/admin/categories/${id}`, { method: 'delete' }),
      },
      category_properties: {
        list: (category_id) =>
          axios(`/admin/categories/${category_id}/properties`, { method: 'get' }),
        one: (category_id, property_id) =>
          axios(`/admin/categories/${category_id}/properties/${property_id}`, { method: 'get' }),
        create: (category_id, data) =>
          axios(`/admin/categories/${category_id}/properties`, { method: 'post', data }),
        update: (category_id, property_id, data) =>
          axios(`/admin/categories/${category_id}/properties/${property_id}`, {
            method: 'put',
            data,
          }),
        destroy: (category_id, property_id) =>
          axios(`/admin/categories/${category_id}/properties/${property_id}`, { method: 'delete' }),
      },
      category_property_options: {
        create: (category_id, property_id, data) =>
          axios(`/admin/categories/${category_id}/properties/${property_id}/options`, {
            method: 'post',
            data,
          }),
        update: (category_id, property_id, option_id, data) =>
          axios(`/admin/categories/${category_id}/properties/${property_id}/options/${option_id}`, {
            method: 'put',
            data,
          }),
        destroy: (category_id, property_id, option_id) =>
          axios(`/admin/categories/${category_id}/properties/${property_id}/options/${option_id}`, {
            method: 'delete',
          }),
      },
      products: {
        list: (params) => axios('/admin/products', { method: 'get', params }),
        create: (data) => axios(`/admin/products`, { method: 'post', data }),
        one: (id) => axios(`/admin/products/${id}`, { method: 'get' }),
        update: (id, data) => axios(`/admin/products/${id}`, { method: 'put', data }),
        destroy: (id) => axios(`/admin/products/${id}`, { method: 'delete' }),
      },
      product_prices: {
        create: (id, data) => axios(`/admin/products/${id}/prices`, { method: 'post', data }),
      },
      isAxiosError,
    };
  }

  return instance;
};
