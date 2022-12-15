import { RootState } from '../rootReducer';

const selectSigninStatus = (state: RootState) => {
  return state.user.isSignedIn;
};

const selectUserRole = (state: RootState) => {
  return state.user.role;
};

export { selectSigninStatus, selectUserRole };
