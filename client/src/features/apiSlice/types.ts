export type ICreatePostParams = {
  userId: number;
  shared_post_id?: number;
  post_text?: string;
  media_location?: string;
};

export type IAuthProps = {
  email: string;
  password: string;
};

export type IRegisterProps = {
  username: string;
  email: string;
  password: string;
};

// TODO: test type

export type IResponse<T> = {
  data: T;
  meta: IMetaData;
};

export type IMetaData = {
  totalPages?: number;
  hasNextPage?: boolean;
};

export type IErrorResponse = {
  status: string;
  data: {
    error: string;
  };
};

export function isIErrorResponse(obj: any): obj is IErrorResponse {
  return "status" in obj && "data" in obj;
}
