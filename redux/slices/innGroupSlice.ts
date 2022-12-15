import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inn } from 'types/innType';
import { IRoom } from 'types/roomType';
import { getAllInns } from '../actions/innGroupActions';

const innGroupSlice = createSlice({
  name: 'inn',
  initialState: {
    allInns: [] as Inn[],
    newInnForm: {
      group_name: '',
      address: '',
    },
  },
  reducers: {
    setInnForm(state, action: PayloadAction<{ group_name: string; address: string }>) {
      state.newInnForm = action.payload;
    },
    resetInnGroup(state) {
      state.allInns = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllInns.fulfilled, (state, action) => {
      state.allInns = action.payload;
    });
    builder.addDefaultCase((state) => state);
  },
});

export default innGroupSlice;

export const { setInnForm, resetInnGroup } = innGroupSlice.actions;
