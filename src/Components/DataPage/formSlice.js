// formSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    isOpen: false,
    form: { name: '', describe: '' },
  },
  reducers: {
    openDialog: (state) => {
      state.isOpen = true;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
    updateForm: (state, action) => {
      state.form = action.payload;
    },
    submitForm: (state) => {
      state.isOpen = false;
      // Reset form or handle submission
    },
  },
});

export const { openDialog, closeDialog, updateForm, submitForm } = formSlice.actions;

export default formSlice.reducer;
