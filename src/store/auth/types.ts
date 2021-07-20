import { IUser } from 'interface';

export interface initialStateProps {
  user: IUser;
  error: string | undefined;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface SignUpProps {
  email: string;
  password: string;
  password_confirmation: string;
}
