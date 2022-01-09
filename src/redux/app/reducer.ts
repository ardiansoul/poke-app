import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NamedAPIResource } from ".";
import { RootState } from "../store";
import { getData } from "./services";

interface state {
  loading: boolean
  results: Array<NamedAPIResource>,
  count: number,
  pageNumber: number,
  limit: number
}

const initialState: state = {
  loading: true,
  results: [],
  count: 0,
  pageNumber: 0,
  limit: 10
};

export const load = createAsyncThunk(
  "app/load",
  async (payload: { pageNumber: number, limit?: number }) => {
    const response = await getData(payload.pageNumber, payload.limit ? payload.limit : initialState.limit)
    return response
  }
)

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    onCatched: (state, action: PayloadAction<string>) => {
      return { ...state, primary: action.payload };
    },

  },
  extraReducers: (builder) => {
    builder.addCase(load.pending, (state, action) => {
      return { ...state, loading: true }
    })

    builder.addCase(load.fulfilled, (state, action) => {
      return { ...action.payload, loading: false }
    })

  }
});

export const { onCatched } = appSlice.actions;

export const selectApp = (state: RootState) => state.app;

export default appSlice.reducer;