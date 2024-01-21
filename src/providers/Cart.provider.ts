import { makeAutoObservable } from "mobx";

import { Trip } from "../models/Trip.model";
import { Hotel } from '../models/Hotel.model'
import { StorageService } from "../services";

export type TripWithSelectedHotel = Trip & {
  hotel: Hotel
}

class CartProvider {
  private travels: TripWithSelectedHotel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTrip(newTrip: TripWithSelectedHotel) {
    if (this.travels.find((trip) => trip.id === newTrip.id)) {
      return;
    }
    this.travels = [...this.travels, newTrip];
    StorageService.saveCart(this.travels)
  }

  delTrip(oldTrip: Trip) {
    const newTravels = this.travels.filter((trip) => trip.id !== oldTrip.id);

    try {
      this.travels = newTravels;
      StorageService.saveCart(this.travels)
    } catch {
      console.log('ERROR DEL TRIP')
    }
  }

  getCart() {
    return this.travels;
  }

  getCant() {
    return this.travels.length;
  }

  inCart(trip: Trip) {
    if (this.travels.find((tr) => tr.id === trip.id)) {
        return true;
    }
    return false;
  }

  getTotal(){
    const total = this.travels.reduce((acc, travel) => {
      return acc + travel.price;
    }, 0);
    
    return total;
  }

  reset(){
    this.travels = []
    StorageService.delCart()
  }

  load() {
    if(StorageService.hasCart()) {
      this.travels = StorageService.getCart()
      console.log('travels: ', this.travels)
    }
  }
}

export const cartProvider = new CartProvider();
