import type { AbilityName } from '@/types/models/ability.ts';

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
