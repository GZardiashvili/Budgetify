export interface Obligatory {
  id: string;
  accountId: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  frequency: string;
  dayOfPayment: Date;
  firstDayOfPayment: Date;
  lastDayOfPayment: Date;
  dateOfCreation: Date;
  dateOfUpdate: Date;
}
