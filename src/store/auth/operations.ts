import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from 'api';
import { SignInProps, SignUpProps } from './types';

export const signIn = createAsyncThunk('auth/signIn', async (payload: SignInProps) => {
  const response = await authAPI.signIn(payload);
  const data = response.data.data;
  return { ...data, token: response.headers['access-token'], clientToken: response.headers.client };
});

export const signUp = createAsyncThunk('auth/signUp', async (payload: SignUpProps) => {
  const response = await authAPI.signUp(payload);
  const data = response.data.data;
  return { ...data, token: response.headers['access-token'], clientToken: response.headers.client };
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await authAPI.signOut();
});
