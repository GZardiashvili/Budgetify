export interface Statistics {
  accountId: string,
  title: string
  fromDate: Date
  toDate: Date
  expansePerCategory: [{
    categoryId: string,
    categoryName: string,
    expanse: number
  }],
  percentagePerCategory: [{
    categoryId: string,
    categoryName: string,
    percentage: number
  }],
}
