import { Travel } from "./Travels.model"

export type Hotel = {
    id: string, 
    name: string,
    star: number,
    travels: Travel[]
}