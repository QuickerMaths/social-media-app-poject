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

export type IResolveFriendRequestProps = {
  userId: string;
  userToAddId: string;
  action: "accept" | "reject";
  requestId: string;
};

export type IErrorResponse = {
  status: string;
  data: {
    data: {
      error: string;
      status: string;
    };
  };
};

export function isIErrorResponse(obj: any): obj is IErrorResponse {
  return "status" in obj && "data" in obj;
}
