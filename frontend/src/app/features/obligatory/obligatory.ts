export interface Obligatory {
  userId: string,
  title: string
  description: string,
  amount: number,
  currency: string,
  dayOfPayment: Date,
  frequency: string,
  dateOfTheFirstPayment: Date,
  dateOfTheLastPayment: Date,
  createdOn: Date,
  updatedOn: Date,
}
