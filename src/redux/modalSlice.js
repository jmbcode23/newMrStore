import { createSlice } from '@reduxjs/toolkit'


const modalState = {
  open: "false"
}

export const modalSlice = createSlice({
  name: 'modal',
  modalState,
  reducers: {
    showModal: (state) => {
      state.open = "true"
    },

  },
})


// Action creators are generated for each case reducer function
export const { showModal } = modalSlice.actions

export default modalSlice.reducer