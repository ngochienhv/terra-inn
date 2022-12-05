import { RootState } from '../rootReducer';

const selectSigninStatus = (state: RootState) => {
  return state.user.isSignedIn;
};

export { selectSigninStatus };
