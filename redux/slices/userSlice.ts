import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isSignedIn: false,
    role: '',
  } as {
    isSignedIn: boolean;
    role: string;
  },
  reducers: {
    signIn(state, action) {
      return { ...state, isSignedIn: true, role: action.payload };
    },
    signOut(state) {
      return { ...state, isSignedIn: false, role: '' };
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => state);
  },
});

export default userSlice;

export const { signIn, signOut } = userSlice.actions;
