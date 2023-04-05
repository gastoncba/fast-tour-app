import { makeAutoObservable } from "mobx";

import { Travel } from "../models/Travels.model";
import { Hotel } from '../models/Hotel.model'
import { StorageService } from "../services";

export type TravelWithSelectedHotel = Travel & {
  hotel: Hotel
}

class CartProvider {
  private travels: TravelWithSelectedHotel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTrip(newTrip: TravelWithSelectedHotel) {
    if (this.travels.find((trip) => trip.id === newTrip.id)) {
      return;
    }
    this.travels = [...this.travels, newTrip];
    StorageService.saveCart(this.travels)
  }

  delTrip(oldTrip: Travel) {
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

  inCart(trip: Travel) {
    if (this.travels.find((tr) => tr.id === trip.id)) {
        return true;
    }
    return false;
  }

  load() {
    if(StorageService.hasCart()) {
      this.travels = StorageService.getCart()
      console.log('travels: ', this.travels)
    }
  }
}

export const cartProvider = new CartProvider();
