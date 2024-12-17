import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Pagination } from '@/types/common.ts';

export const usePagination = () => {
  const route = useRoute();
  const router = useRouter();

  const pagination = ref<Pagination>({
    limit: 0,
    page: route.query.page && Number.isInteger(+route.query.page) ? +route.query.page : 1,
    pages: 1,
    count: 0,
  });

  const changePage = async (page: number, callback?: () => Promise<unknown>) => {
    await router.replace({ name: 'users', query: { ...route.query, page } });
    pagination.value.page = page;
    if (callback) await callback();
  };

  return {
    pagination,
    changePage,
  };
};
