export type IUser = {
  id: number;
  username: string;
  email: string;
  is_email_confirmation: boolean;
  password: string;
  avatar_url: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  postal_code?: string;
  created_at: string;
};

export type IUserPartial = Pick<IUser, "username" | "id" | "avatar_url">;

export type IUserUpdateData = Partial<IUser>;
