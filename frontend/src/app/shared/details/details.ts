export interface Details {
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
  firstDayOfPayment?: Date;
  lastDayOfPayment?: Date;
  dayOfPayment?: Date;
}
