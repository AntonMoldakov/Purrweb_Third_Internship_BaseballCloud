import { IUser } from 'interface';

export type AuthResponse = {
  data: IUser;
};
export type DeleteResponse = {
  success: boolean;
};

export type SignInProps = {
  email: string;
  password: string;
};

export type SignUpProps = {
  email: string;
  password: string;
  password_confirmation: string;
};
