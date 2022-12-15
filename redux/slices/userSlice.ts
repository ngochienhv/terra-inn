import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { UserProfileType } from 'types/userProfileType';
import { getUserProfile } from '../actions/userActions';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isSignedIn: false,
    role: '',
    profile: {},
  } as {
    isSignedIn: boolean;
    role: string;
    profile: UserProfileType;
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
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addDefaultCase((state) => state);
  },
});

export default userSlice;

export const { signIn, signOut } = userSlice.actions;
