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
import type { CategoryData, ListCategoriesParams, ListCategory } from '@/types/models/category.ts';
import type {
  CategoryPropertyData,
  ListCategoryProperty,
} from '@/types/models/category-property.ts';
import type {
  CategoryPropertyOption,
  CategoryPropertyOptionData,
} from '@/types/models/category-property-option.ts';
import type { ListProduct, ListProductsParams, ProductData } from '@/types/models/product.ts';
import type { ProductPrice, ProductPriceData } from '@/types/models/product-price.ts';

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
    switch_type: (id: string) => Response<ExtendedListUser>;
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
    create: (data: CategoryData) => Response<ListCategory>;
    update: (id: string, data: CategoryData) => Response<ListCategory>;
    destroy: (id: string) => Response<void>;
  };
  category_properties: {
    list: (category_id: string) => Response<ListCategoryProperty[]>;
    one: (category_id: string, property_id: string) => Response<ListCategoryProperty>;
    create: (category_id: string, data: CategoryPropertyData) => Response<ListCategoryProperty>;
    update: (
      category_id: string,
      property_id: string,
      data: CategoryPropertyData,
    ) => Response<ListCategoryProperty>;
    destroy: (category_id: string, property_id: string) => Response<void>;
  };
  category_property_options: {
    create: (
      category_id: string,
      property_id: string,
      data: CategoryPropertyOptionData,
    ) => Response<CategoryPropertyOption>;
    update: (
      category_id: string,
      property_id: string,
      option_id: string,
      data: CategoryPropertyOptionData,
    ) => Response<CategoryPropertyOption>;
    destroy: (category_id: string, property_id: string, option_id: string) => Response<void>;
  };
  products: {
    list: (params?: ListProductsParams) => Response<PaginatedResponse<ListProduct>>;
    one: (id: string) => Response<ListProduct>;
    create: (data: ProductData) => Response<ListProduct>;
    update: (id: string, data: ProductData) => Response<ListProduct>;
    destroy: (id: string) => Response<void>;
  };
  product_prices: {
    create: (id: string, data: ProductPriceData) => Response<ProductPrice>;
  };
  isAxiosError: typeof isAxiosError;
}
