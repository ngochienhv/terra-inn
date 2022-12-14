import { combineReducers } from 'redux';
import formSlice from './slices/formSlice';
import userSlice from './slices/userSlice';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [formSlice.name]: formSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
