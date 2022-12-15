import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRoom } from 'types/roomType';
import { getRoomDetail } from '../actions/roomActions';

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    roomForm: {} as IRoom,
  },
  reducers: {
    setRoomFormValue(state, action: PayloadAction<IRoom>) {
      state.roomForm = action.payload;
    },
    resetRoomFormValue(state) {
      state.roomForm = {} as IRoom;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoomDetail.fulfilled, (state, action) => {
      state.roomForm = action.payload;
    });
    builder.addDefaultCase((state) => state);
  },
});

export default roomSlice;

export const { setRoomFormValue, resetRoomFormValue } = roomSlice.actions;
