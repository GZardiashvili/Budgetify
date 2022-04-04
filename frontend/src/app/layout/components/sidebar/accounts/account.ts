export interface Account {
  id: string;
  userId: string,
  title: string,
  description: string,
  category: string,
  currency: string,
  availableAmount: number,
  dateOfCreation: Date,
  dateOfUpdate: Date,
}
