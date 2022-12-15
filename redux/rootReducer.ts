import { combineReducers } from 'redux';
import formSlice from './slices/roomSlice';
import innGroupSlice from './slices/innGroupSlice';
import userSlice from './slices/userSlice';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [formSlice.name]: formSlice.reducer,
  [innGroupSlice.name]: innGroupSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
