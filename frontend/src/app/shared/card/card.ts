export interface Card {
  id?: string;
  userId?: string;
  type?: string;
  accountId?: string;
  title?: string;
  description?: string;
  category?: string[];
  currency?: string;
  amount?: number;
  availableAmount?: number;
  frequency?: string;
  linkToFile?: string;
  dateOfOperation?: Date;
  dateOfCreation?: Date;
  dateOfUpdate?: Date;
  firstDateOfPayment?: Date;
  lastDateOfPayment?: Date;
  dateOfPayment?: Date;
  goal?: string;
  goalAmount?: number;
  savings?: number;
  crashDate?: Date;
}
