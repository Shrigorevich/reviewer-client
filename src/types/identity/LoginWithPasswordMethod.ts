export type LoginWithPasswordMethod = {
  csrf_token?: string;
  identifier: string;
  method: string;
  password: string;
  password_identifier?: string;
};
