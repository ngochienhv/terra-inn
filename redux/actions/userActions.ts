import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserProfile = createAsyncThunk('user/getUserProfile', async () => {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.get('user', {
      headers: { token: token },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});
