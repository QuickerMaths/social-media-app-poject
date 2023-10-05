export default interface IUserProfile {
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
  createdAt: Date;
}
