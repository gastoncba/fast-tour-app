import { Country } from "./Country.model"
import { Hotel } from "./Hotel.model"

export type Place = {
    id: string
    name: string
    img: string | null
    country: Country
    hotels: Hotel[]
}