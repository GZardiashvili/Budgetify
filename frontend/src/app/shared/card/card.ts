import { Category } from '../../features/categories/category';
import {Currency} from "../../layout/components/sidebar/accounts/currency";

export interface Card {
  id?: string;
  user?: string;
  type?: string;
  accountId?: string;
  title?: string;
  description?: string;
  category?: Category[];
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
  payee?: string;
}
