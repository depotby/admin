import { isAxiosError, type AxiosResponse } from 'axios';
import type {
  AuthenticationCreateData,
  AuthenticationResponseData,
  RefreshData,
} from '@/types/models/authentication.ts';
import type { ExtendedListUser, ListUser, ListUsersParams, User } from '@/types/models/user.ts';
import type { PaginatedResponse } from '@/types/common.ts';
import type { ExtendedListRole, ListRole, RoleData } from '@/types/models/role.ts';
import type { AbilityName } from '@/types/models/ability.ts';
import type { ListCategoriesParams, ListCategory } from '@/types/models/category.ts';

type Response<T> = Promise<AxiosResponse<T>>;

export interface Api {
  authentications: {
    create: (data: AuthenticationCreateData) => Response<AuthenticationResponseData>;
    refresh: (data: RefreshData) => Response<AuthenticationResponseData>;
    destroy: () => Response<void>;
  };
  user: {
    info: () => Response<User>;
  };
  users: {
    list: (params?: ListUsersParams) => Response<PaginatedResponse<ListUser>>;
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
  categories: {
    list: (params?: ListCategoriesParams) => Response<PaginatedResponse<ListCategory>>;
    one: (id: string) => Response<ListCategory>;
  };
  isAxiosError: typeof isAxiosError;
}
