import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isSignedIn: false,
  },
  reducers: {
    signIn(state) {
      return { ...state, isSignedIn: true };
    },
    signOut(state) {
      return { ...state, isSignedIn: false };
    },
  },
});

export default userSlice;

export const { signIn, signOut } = userSlice.actions;
