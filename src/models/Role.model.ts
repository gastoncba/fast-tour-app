export enum RoleType {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export type Role = {
  id: number;
  name: RoleType;
};
