import { createSlice } from "@reduxjs/toolkit";
import { IModalSliceState } from "./types";

const initialState: IModalSliceState = {
  modals: {},
};

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalId } = action.payload;
      state.modals[modalId] = true;
    },
    closeModal: (state, action) => {
      const { modalId } = action.payload;
      state.modals[modalId] = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
