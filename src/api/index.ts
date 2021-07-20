import { AuthResponse, DeleteResponse, SignInProps, SignUpProps } from './types';
import api from 'api/httpServices';

export const authAPI = {
  signIn(data: SignInProps) {
    return api.post<AuthResponse>(`auth/sign_in`, data);
  },
  signUp(data: SignUpProps) {
    return api.post<AuthResponse>(`auth`, data);
  },
  signOut() {
    return api.delete<DeleteResponse>(`auth/sign_out`);
  },
};
