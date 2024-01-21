import { makeAutoObservable } from "mobx";

import { cartProvider } from "./Cart.provider";
import { userProvider } from "./User.provider";

class LoaderProvider {
  public isStarting = true;

  public setIsStarting(value: boolean) {
    this.isStarting = value;
  }
  constructor() {
    makeAutoObservable(this);
  }

  public init = async () => {
    try {
      const user = userProvider.loginByToken();
      this.setIsStarting(false);
      cartProvider.load()
      return user;
    } catch (error) {
      this.setIsStarting(false);
    }
  };
}

export const loaderProvider = new LoaderProvider();
