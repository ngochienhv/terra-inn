import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRoomDetail = createAsyncThunk('room/getRoomDetail', async (id: string) => {
  try {
    const response = await axios.get('motel', {
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});
