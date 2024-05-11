import { Role } from "./Role.model";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  isLogged: boolean;
};
