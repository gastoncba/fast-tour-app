import { Hotel } from "./Hotel.model";
import { Place } from "./Place.model";

export type Travel = {
    id: string; 
    name: string, 
    price: number,
    startDate: string,
    endDate: string,
    img: string,
    place: Place,
    hotels: Hotel[]
}