import { isAxiosError, type AxiosResponse } from 'axios';
import type {
  AuthenticationCreateData,
  AuthenticationResponseData,
  RefreshData,
} from '@/types/models/authentication.ts';
import type { ExtendedListUser, ListUser, User } from '@/types/models/user.ts';
import type { PaginatedResponse } from '@/types/common.ts';
import type { ExtendedListRole, ListRole, RoleData } from '@/types/models/role.ts';
import type { AbilityName } from '@/types/models/ability.ts';

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
  roles: {
    list: () => Response<PaginatedResponse<ListRole>>;
    one: (id: string) => Response<ExtendedListRole>;
    create: (data: RoleData) => Response<ExtendedListRole>;
    update: (id: string, data: RoleData) => Response<ExtendedListRole>;
    destroy: (id: string) => Response<void>;
    switch_ability: (id: string, ability: AbilityName) => Response<ExtendedListRole>;
  };
  isAxiosError: typeof isAxiosError;
}
