import type { AbilityName } from '@/types/models/ability.ts';
import type { UserRole } from '@/types/models/role.ts';
import type { BaseOrder, BasePagination } from '@/types/common.ts';

export enum UserAccountType {
  regular = 'regular',
  employee = 'employee',
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  email: string;
  account_type: UserAccountType;
  created_at: string;
  updated_at: string;
  abilities: AbilityName[];
}

export interface ListUsersParams extends BasePagination, BaseOrder {
  order_param?: 'email' | 'first_name' | 'last_name' | 'account_type' | 'created_at' | 'updated_at';
}

export interface ListUser {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  email: string;
  account_type: UserAccountType;
  created_at: string;
  updated_at: string;
}

export interface ExtendedListUser extends ListUser {
  roles: UserRole[];
}
