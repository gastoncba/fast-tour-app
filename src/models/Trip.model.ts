import { Place } from "./Place.model";

export type Trip = {
    id: number; 
    name: string, 
    description: string | null
    price: number,
    startDate: string,
    endDate: string,
    img: string | null,
    places: Place[],
}