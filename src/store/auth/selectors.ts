import { RootState } from 'store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserToken = (state: RootState) => state.auth.user.token;
