import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllInns = createAsyncThunk('inn/getAllInns', async (token: string) => {
  const response = await axios.get('motel-group/list', {
    headers: {
      token: token,
    },
  });
  console.log(response.data);

  return response.data;
});
