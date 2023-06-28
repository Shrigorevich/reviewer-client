export type RegisterCredentials = {
  csrf_token: string;
  password: string;
  traits: {
    [key: string]: string;
  };
};
