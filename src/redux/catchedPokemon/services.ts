import { NamedAPIResource } from "../app";

export const getData = async (): Promise<any> => {
    try {
        const response: string | null = localStorage.getItem("catchedPokemon");
        if (response !== null) {
            const result = JSON.parse(response)
            return {
                pokemon: result
            }
        } else {
            return {
                pokemon: []
            }
        }
    } catch (err) {
        console.log(JSON.stringify(err))
    }
}
export const getById = async (id: string): Promise<any> => {
    try {
        const response: string | null = localStorage.getItem("catchedPokemon");
        if (response !== null) {
            const result = JSON.parse(response)
            let findData = result.find((item: any) => item.id === id)
            if (findData) {
                return findData
            } else {
                return undefined
            }
        } else {
            return undefined
        }
    } catch (err) {
        console.log(JSON.stringify(err))
    }
}

export const saveData = async (payload: { name: string, id: string }): Promise<any> => {
    try {
        let savedData = await getData()

        let data: NamedAPIResource = {
            name: payload.name,
            url: `https://pokeapi.co/api/v2/pokemon/${payload.id}`,
            id: payload.id
        }

        let existData = savedData.pokemon.find((item: NamedAPIResource) => item.id === payload.id)
        if (existData) {
            return {
                result: savedData.pokemon
            }
        } else {
            let newData = [...savedData.pokemon, data]
            localStorage.setItem("catchedPokemon", JSON.stringify(newData))
            return {
                result: newData
            }
        }
    } catch (err) {
        console.log(JSON.stringify(err))
    }
}

export const deleteData = async (id: string): Promise<any> => {
    try {
        let savedData = await getData()

        let index = savedData.pokemon.findIndex((item: NamedAPIResource) => item.id == id)
        let removed = savedData.pokemon.splice(index, index + 1)

        localStorage.setItem("catchedPokemon", JSON.stringify(savedData.pokemon))
        return {
            result: savedData.pokemon
        }
    } catch (err) {
        console.log(JSON.stringify(err))
    }
}
