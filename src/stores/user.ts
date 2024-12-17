import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import router from '@/configurations/router.ts';
import { useApi } from '@/composables/use-api.ts';
import type { User } from '@/types/models/user.ts';
import type { AuthenticationCreateData } from '@/types/models/authentication.ts';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const useUserStore = defineStore('user', () => {
  const api = useApi();

  const access_token = ref(localStorage.getItem(ACCESS_TOKEN_KEY));
  const refresh_token = ref(localStorage.getItem(REFRESH_TOKEN_KEY));
  const user = ref<User>();

  const isAuthorized = computed(() => !!refresh_token.value);

  const updateTokens = (tokens?: { refresh: string; access: string }) => {
    if (tokens) {
      const { access, refresh } = tokens;
      access_token.value = access;
      refresh_token.value = refresh;
      localStorage.setItem(ACCESS_TOKEN_KEY, access);
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
    } else {
      access_token.value = null;
      refresh_token.value = null;
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  };

  const createTokens = async (user: AuthenticationCreateData['user']) => {
    const { data } = await api.authentications.create({ user });
    updateTokens(data.tokens);
  };

  const refreshTokens = async () => {
    if (!refresh_token.value) return;

    const { data } = await api.authentications.refresh({ token: refresh_token.value });
    updateTokens(data.tokens);
  };

  const loadUser = async () => {
    const { data } = await api.user.info();
    user.value = data;
  };

  const autologin = async () => {
    if (!isAuthorized.value) return;

    await loadUser();
  };

  const signOut = async (skipRequest = false) => {
    if (!skipRequest) await api.authentications.destroy();

    updateTokens();
    await router.push({ name: 'authentication-sign-in' });
  };

  return {
    access_token,
    refresh_token,
    user,
    isAuthorized,
    updateTokens,
    createTokens,
    refreshTokens,
    loadUser,
    autologin,
    signOut,
  };
});
