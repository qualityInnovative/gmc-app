export class RetailRateList {
    id: number = 0;
    retailPrice: number = 0;
    effectiveStartDate: string = '';
    effectiveEndDate: string = '';
    commodityId: number = 0;
    mandiId: number = 0;
    approvedByUserId: number = 0;
    districtId: number = 0;
    unitId: number = 0;
    mandiPrice: number = 0;
    categoryId: number = 0;
    corporateId: number = 0;
    createdBy!: number;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}