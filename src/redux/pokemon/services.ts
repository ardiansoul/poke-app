import axios from "axios"
import { getById } from "../catchedPokemon/services"

export const getData = async (id: string): Promise<any> => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const findData = await getById(id)

        if (findData) {

            return {
                catched: true,
                pokemon: response.data
            }
        } else {
            return {
                catched: false,
                pokemon: response.data
            }

        }
    } catch (err) {
        console.log(JSON.stringify(err))
    }
}