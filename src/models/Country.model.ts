import { Place } from "./Place.model"

export type Country  = {
    id:string
    name: string
    img: string
    places: Place[]
}