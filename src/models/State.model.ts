export enum OrderState {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PAID = "PAID",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED"
}


export type State = {
  id: OrderState;
  name: string;
};
