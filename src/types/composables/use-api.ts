import { isAxiosError, type AxiosResponse } from 'axios';
import type {
  AuthenticationCreateData,
  AuthenticationResponseData,
  RefreshData,
} from '@/types/models/authentication.ts';
import type { User } from '@/types/models/user.ts';

type Response<T> = Promise<AxiosResponse<T>>;

export interface Api {
  authentications: {
    create: (data: AuthenticationCreateData) => Response<AuthenticationResponseData>;
    refresh: (data: RefreshData) => Response<AuthenticationResponseData>;
  };
  user: {
    info: () => Response<User>;
  };
  isAxiosError: typeof isAxiosError;
}
