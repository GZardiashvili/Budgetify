export interface Transaction {
  type: string,
  accountId: string,
  title: string,
  description: string,
  dateOfOperation: Date,
  category: string,
  currency: string,
  amount: number,
  linkToFile: string,
  dateOfCreation: Date,
  dateOfUpdate: Date,
}
