import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalSliceState } from "./types";

const initialState: IModalSliceState = {
  modals: {
    editPostModal: false,
  },
};

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
