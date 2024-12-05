export interface AuthenticationCreateData {
  user: {
    email: string;
    password: string;
  };
}

export interface AuthenticationResponseData {
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface RefreshData {
  token: string;
}
