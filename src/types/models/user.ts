export enum UserAccountType {
  regular = 'regular',
  employee = 'employee',
}

export interface User {
  id: string;
  email: string;
  account_type: UserAccountType;
  created_at: string;
  updated_at: string;
}
