import type { AbilityName } from '@/types/models/ability.ts';

export interface UserRole {
  id: string;
  name: string;
}

export interface ListRole {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ExtendedListRole extends ListRole {
  abilities: AbilityName[];
}
