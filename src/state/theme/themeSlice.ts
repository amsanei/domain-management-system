import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  value: "dark" | "light";
}

const initialState: ThemeState = {
  value: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = state.value === "dark" ? "light" : "dark";
    },
  },
});

export const { toggle } = themeSlice.actions;
export default themeSlice.reducer;
