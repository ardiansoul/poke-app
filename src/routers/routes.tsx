import { ReactElement } from "react"
import { Detail, Home, MyPokemon, NotFound } from "../pages"

interface Route {
    path: string,
    element: ReactElement,
}

export const routes: Route[] = [
    { path: "/", element: <Home /> },
    { path: "/my-pokemon", element: <MyPokemon /> },
    { path: "/:id", element: <Detail /> },
    { path: "*", element: <NotFound /> },
]
