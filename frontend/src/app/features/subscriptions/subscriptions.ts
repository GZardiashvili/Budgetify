export interface Subscriptions {
  accountId: string;
  title: string;
  description: string;
  firstDayOfPayment: Date;
  lastDayOfPayment: Date;
  dayOfPayment: Date;
  category: string;
  currency: string;
  amount: number;
  dateOfCreation: Date;
  dateOfUpdate: Date;
}
