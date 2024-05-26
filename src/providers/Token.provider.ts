import { makeAutoObservable } from "mobx";

import { Token } from "../models/Token.model";
import { StorageService } from "../services/private/Storage.service";
import { UserService } from "../services/private/User.service";

type TokenProviderError = "AUTH_TOKEN-NOT-FOUND" | "TOKEN-SAVE-FAIL";

class TokenProvider {
  constructor() {
    makeAutoObservable(this);
  }

  private newError(code: TokenProviderError, error?: any): {} {
    return {
      code: code,
      error: error,
    };
  }

  public authToken = () => {
    let auth_token = StorageService.getTokens();
    return auth_token.at;
  };

  public clearTokens = () => {
    StorageService.deleteTokens();
  };

  public token = (token: Token) => {
    StorageService.saveToken(token.access_token);
  };

  public isTokenValid = async () => {
    this.authToken();
    let user = await UserService.isTokenValid();
    return user;
  };
}

export const tokenProvider = new TokenProvider();
