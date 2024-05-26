import { makeAutoObservable, toJS } from "mobx";

import { Role, RoleType, User, Token } from "../models/index";
import { tokenProvider } from "./Token.provider";
import { UserService } from "../services/private/User.service";

class UserProvider {
  private isLogged: boolean = false;
  private id: number = 0;
  private email: string = "";
  private firstName: string = "";
  private lastName: string = "";
  private role: Role = { id: 2, name: RoleType.CUSTOMER };

  constructor() {
    makeAutoObservable(this);
  }

  public set user(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.lastName = user.lastName;
    this.firstName = user.firstName;
    this.isLogged = user.isLogged ? user.isLogged : this.isLogged;
    this.role = user.role;
  }

  public get user(): User {
    let user = {
      id: this.id,
      email: this.email,
      lastName: this.lastName,
      firstName: this.firstName,
      isLogged: this.isLogged,
      role: this.role,
    };
    return toJS(user);
  }

  public get getRole(): Role {
    let role = {
      id: this.role.id,
      name: this.role.name,
    };
    return toJS(role);
  }

  public signup = async (newUser: { firstName: string; lastName: string; email: string; password: string }) => {
    await UserService.signUp(newUser);
    await this.login(newUser.email, newUser.password);
  };

  public login = async (email: string, password: string) => {
    let login_data: { user: User; token: Token } = await UserService.login(email, password);
    tokenProvider.token(login_data.token);
    this.user = { ...login_data.user, isLogged: true };
  };

  public loginByToken = async () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const user = await tokenProvider.isTokenValid();
        this.user = { ...user, isLogged: true };
        resolve();
      } catch (error) {
        resolve();
      }
    });
  };

  public update = async (changes: { firstName?: string; lastName?: string; email?: string }) => {
    const user = await UserService.update(changes);
    this.user = { ...user, isLogged: true };
  };

  public getOrders = async () => {
    return await UserService.getOrders(this.user.id);
  };

  public getUsers = async () => {
    return await UserService.getUsers(this.isAdmin());
  };

  public isAdmin = () => {
    return this.role.name === RoleType.ADMIN;
  };

  public logout = () => {
    this.user.isLogged = false;
  };

  public getRolName() {
    return this.isAdmin() ? "Administrador" : "Cliente";
  }

  public recoverPassword = async (email: string, url: string) => {
    await UserService.recoverPassword(email, url);
  };

  public changePassword = async (token: string, newPassword: string) => {
    await UserService.changePassword(token, newPassword);
  };
}

export const userProvider = new UserProvider();
