import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import thunk, { ThunkMiddleware } from "redux-thunk";
import appReducer from "./app/reducer";
import pokemonReducer from "./pokemon/reducer";
import catchedPokemon from "./catchedPokemon/reducer";


const store = configureStore({
    reducer: {
        app: appReducer,
        pokemon: pokemonReducer,
        catchedPokemon: catchedPokemon
    },
    middleware: [thunk as ThunkMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export default store