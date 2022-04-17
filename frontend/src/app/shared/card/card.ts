export interface Card {
  id?: string;
  type?: string;
  accountId?: string;
  title?: string;
  description?: string;
  category?: string;
  currency?: string;
  amount?: number;
  frequency?: string;
  linkToFile?: string;
  dateOfOperation?: Date;
  dateOfCreation?: Date;
  dateOfUpdate?: Date;
  firstDateOfPayment?: Date;
  lastDateOfPayment?: Date;
  dateOfPayment?: Date;
}