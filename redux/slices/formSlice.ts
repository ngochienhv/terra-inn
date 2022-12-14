import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRoom } from 'types/roomType';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    addRoomForm: {} as IRoom,
    updateRoomForm: {} as IRoom,
  },
  reducers: {
    setAddFormValue(state, action: PayloadAction<IRoom>) {
      state.addRoomForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => state);
  },
});

export default formSlice;

export const { setAddFormValue } = formSlice.actions;
