import {Currency} from "./currency";

export interface Account {
  id: string;
  user: string;
  title: string;
  description: string;
  currency: string;
  availableAmount: number;
  dateOfCreation: Date;
  dateOfUpdate: Date;
}
