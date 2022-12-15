import { RootState } from '../rootReducer';
import { ROLES } from '../../constants/role';

const selectSigninStatus = (state: RootState) => {
  return state.user.isSignedIn;
};

const selectUserRole = (state: RootState) => {
  let role;
  if (state.user.role === ROLES.ADMIN) {
    role = ROLES.ADMIN;
  } else {
    role = state.user.profile.is_rented ? ROLES.RENTER : ROLES.GUEST;
  }
  return role;
};

const selectUserProfile = (state: RootState) => {
  return state.user.profile;
};

export { selectSigninStatus, selectUserRole, selectUserProfile };
