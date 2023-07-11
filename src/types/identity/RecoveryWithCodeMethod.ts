export type RecoverWithCodeMethod = {
  code?: string;
  csrf_token?: string;
  email?: string;
  method: "link" | "code";
};
