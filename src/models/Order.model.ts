import { Hotel } from "./Hotel.model";
import { Place } from "./Place.model";
import { Trip } from "./Trip.model"
import { User } from "./User.model";

export type VisitedPlace = {
    place: Place; 
    hotel: Hotel | null 
}

export type Order = {
    trip: Trip;
    user: User | null;
    visited: VisitedPlace[];
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    purchaseDate: string
}