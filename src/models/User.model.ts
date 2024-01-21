import { Role } from "./Role.model";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  isLogged: boolean;
};
