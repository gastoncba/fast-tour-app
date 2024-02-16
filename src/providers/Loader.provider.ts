import { makeAutoObservable } from "mobx";

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
    } catch (error) {
      this.setIsStarting(false);
    }
  };
}

export const loaderProvider = new LoaderProvider();
