import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pokemonType } from ".";
import { RootState } from "../store";
import { getData } from "./services";

interface state {
  loading: boolean
  catched: boolean
  pokemon: pokemonType
}

const initialState: state = {
  loading: false,
  catched: false,
  pokemon: {
    id: 0,
    name: "",
    base_experience: 0,
    height: 0,
    is_default: false,
    order: 0,
    weight: 0,
    abilities: [],
    forms: [],
    game_indices: [],
    held_items: [],
    location_area_encounters: "",
    moves: [],
    species: {},
    sprites: {},
    stats: [],
    types: [],
    past_types: [],
  }
};

export const load = createAsyncThunk(
  "pokemon/load",
  async (id: string) => {
    const response = await getData(id)
    return response
  }
)

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    onCatched: (state, action: PayloadAction<boolean>) => {
      return { ...state, catched: action.payload };
    },

  },
  extraReducers: (builder) => {
    builder.addCase(load.pending, (state, action) => {
      return { ...state, loading: true }
    })

    builder.addCase(load.fulfilled, (state, action) => {
      return { ...state, ...action.payload, loading: false }
    })

  }
});

export const { onCatched } = pokemonSlice.actions;

export const selectPokemon = (state: RootState) => state.pokemon;

export default pokemonSlice.reducer;
