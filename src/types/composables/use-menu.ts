import type { AbilityName } from '@/types/models/ability.ts';
import type { Icon } from '@/types/assets/icons.ts';

export interface MenuItem {
  id: symbol;
  routeName: string;
  ability?: AbilityName;
  icon: Icon;
  text: string;
  active: boolean;
}
