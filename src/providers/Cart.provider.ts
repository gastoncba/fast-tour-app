import { makeAutoObservable } from "mobx";

import { Travel } from "../models/Travels.model";

class CartProvider {
  private travels: Travel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTrip(newTrip: Travel) {
    if (this.travels.find((trip) => trip.id === newTrip.id)) {
      return;
    }
    this.travels = [...this.travels, newTrip];
  }

  delTrip(oldTrip: Travel) {
    const newTravels = this.travels.filter((trip) => trip.id !== oldTrip.id);

    this.travels = newTravels;
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
}

export const cartProvider = new CartProvider();
