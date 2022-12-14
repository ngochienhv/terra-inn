import { RootState } from '../rootReducer';

const selectAddRoomForm = (state: RootState) => {
  return state.form.addRoomForm;
};

export { selectAddRoomForm };
