import { AuthResponse, DeleteResponse, ImageResponse, SignInProps, SignUpProps } from './types';
import api from 'api/httpServices';

export const authAPI = {
  signIn(data: SignInProps) {
    return api.post<AuthResponse>('auth/sign_in', data);
  },
  signUp(data: SignUpProps) {
    return api.post<AuthResponse>('auth', data);
  },
  signOut() {
    return api.delete<DeleteResponse>('auth/sign_out');
  },
};

export const profileAPI = {
  putReq(url: string) {
    return api.put(url);
  },
  uploadImage(image: File) {
    return api.post<ImageResponse>('s3/signed_url', { name: image.name }).then(response => {
      this.putReq(response.data.signedUrl);
      return 'https://baseballcloud-staging-assets.s3.us-east-2.amazonaws.com/' + response.data.fileKey;
    });
  },
};
