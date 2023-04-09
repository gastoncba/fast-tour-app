import { Country } from "./Country.model"
import { Travel } from "./Travels.model"

export type Place = {
    id: string
    name: string
    img:string
    country: Country
    travels: Travel[]
}