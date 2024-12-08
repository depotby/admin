import { isAxiosError, type AxiosResponse } from 'axios';
import type {
  AuthenticationCreateData,
  AuthenticationResponseData,
  RefreshData,
} from '@/types/models/authentication.ts';
import type { ExtendedListUser, ListUser, User } from '@/types/models/user.ts';
import type { PaginatedResponse } from '@/types/common.ts';

type Response<T> = Promise<AxiosResponse<T>>;

export interface Api {
  authentications: {
    create: (data: AuthenticationCreateData) => Response<AuthenticationResponseData>;
    refresh: (data: RefreshData) => Response<AuthenticationResponseData>;
  };
  user: {
    info: () => Response<User>;
  };
  users: {
    list: () => Response<PaginatedResponse<ListUser>>;
    one: (id: string) => Response<ExtendedListUser>;
  };
  isAxiosError: typeof isAxiosError;
}
