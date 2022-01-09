import axios from "axios"
import { NamedAPIResource } from "."

export const getData = async (pageNumber: number, limit: number): Promise<any> => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${pageNumber}`)

        const dataWithId = response.data.results.map((item: NamedAPIResource) => {
            let id = `${item.url.match(/\/[0-9]{1,}/g)?.toString().slice(1)}`
            return {
                name: item.name,
                url: item.url,
                id: id
            }
        })

        return {
            results: dataWithId,
            count: response.data.count,
            limit: limit,
            pageNumber: pageNumber
        }
    } catch (err) {
        console.log(JSON.stringify(err))

    }
}