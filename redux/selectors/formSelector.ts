import { RootState } from '../rootReducer';

const selectRoomForm = (state: RootState) => {
  return state.room.roomForm;
};

export { selectRoomForm };
