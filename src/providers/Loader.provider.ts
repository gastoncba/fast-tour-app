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
      await userProvider.loginByToken();
      this.setIsStarting(false);
      //cartProvider.load()
    } catch (error) {
      this.setIsStarting(false);
    }
  };
}

export const loaderProvider = new LoaderProvider();
