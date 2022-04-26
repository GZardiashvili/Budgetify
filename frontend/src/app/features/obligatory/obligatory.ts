export interface Obligatory {
  id: string;
  accountId: string;
  title: string;
  description: string;
  amount: number;
  frequency: string;
  dateOfPayment: Date;
  firstDateOfPayment: Date;
  lastDateOfPayment: Date;
  dateOfCreation: Date;
  dateOfUpdate: Date;
}
