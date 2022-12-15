import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllInns = createAsyncThunk('inn/getAllInns', async () => {
  let token = await AsyncStorage.getItem('token');
  const response = await axios.get('motel-group/list', {
    headers: {
      token: token,
    },
  });
  return response.data;
});
