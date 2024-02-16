import { makeAutoObservable } from "mobx";

import { Token } from "../models/Token.model";
import { User } from "../models/User.model";
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

  public authToken(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        let auth_token = await StorageService.getTokens();
        resolve(auth_token.at);
      } catch {
        reject(this.newError("AUTH_TOKEN-NOT-FOUND"));
      }
    });
  }

  public clearTokens = () => {
    StorageService.deleteTokens();
  };

  public token(token: Token) {
    StorageService.saveToken(token.access_token);
  }

  public isTokenValid(): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.authToken()
        let user = await UserService.isTokenValid();
        resolve(user);
      } catch (error) {
        reject(false);
      }
    });
  }
}

export const tokenProvider = new TokenProvider();
