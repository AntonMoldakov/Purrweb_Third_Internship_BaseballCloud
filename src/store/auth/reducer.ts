import { createSlice } from '@reduxjs/toolkit';
import { initialStateProps } from './types';
import { IUser } from 'types';
import { signIn, signOut, signUp } from './operations';

const initialState: initialStateProps = {
  user: {
    email: '',
    password: '',
    role: '',
    id: null,
    token: '',
    clientToken: '',
  },
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signIn.fulfilled, (state, { payload }: { payload: IUser }) => {
      state.user = payload;
      state.error = '';
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }: { payload: IUser }) => {
      state.user = payload;
      state.error = '';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(signOut.fulfilled, () => initialState);
  },
});

export default authSlice.reducer;
