import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NamedAPIResource } from "../app";
import { RootState } from "../store";
import { deleteData, getData, saveData } from "./services";

interface state {
  loading: boolean
  results: Array<NamedAPIResource>,

}

const initialState: state = {
  loading: true,
  results: [],

};

export const probability = function (n: number) {
  return Math.random() < n;
}


export const load = createAsyncThunk(
  "catched/load",
  async () => {
    const response = await getData()
    return response
  }
)

export const onCatched = createAsyncThunk(
  "catched/catch",
  async (payload: { name: string, id: string }) => {
    const response = await saveData(payload)
    return response
  }
)

export const onReturn = createAsyncThunk(
  "catched/return",
  async (payload: { id: string }) => {
    const response = await deleteData(payload.id)
    return response
  }
)

const catchedSlice = createSlice({
  name: "catched",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(load.pending, (state, action) => {
      return { ...state, loading: true }
    })

    builder.addCase(load.fulfilled, (state, action) => {
      return { results: action.payload.pokemon, loading: false }
    })

    builder.addCase(onCatched.pending, (state, action) => {
      return { ...state, loading: true }
    })

    builder.addCase(onCatched.fulfilled, (state, action) => {
      return { results: action.payload.result, loading: false }
    })

    builder.addCase(onReturn.pending, (state, action) => {
      return { ...state, loading: true }
    })

    builder.addCase(onReturn.fulfilled, (state, action) => {
      return { results: action.payload.result, loading: false }
    })

  }
});

export const { } = catchedSlice.actions;

export const selectcatched = (state: RootState) => state.catchedPokemon;

export default catchedSlice.reducer;