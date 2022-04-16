export interface Transaction {
  id: string;
  accountId: string;
  type: string;
  title: string;
  description: string;
  payee: string;
  dateOfPayment: Date;
  category: string;
  currency: string;
  amount: number;
  linkToFile: string;
  dateOfCreation: Date;
  dateOfUpdate: Date;
}
