export interface Transaction {
  id: string;
  accountId: string;
  type: string;
  title: string;
  description: string;
  dateOfOperation: Date;
  category: string[];
  currency: string;
  amount: number;
  linkToFile: string;
  dateOfCreation: Date;
  dateOfUpdate: Date;
}
