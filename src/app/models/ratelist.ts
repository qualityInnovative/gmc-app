export class RateList {
    id: number = 0;
    price: number | undefined;
    effectiveStartDate: Date = new Date();
    effectiveEndDate: Date = new Date();
    commodityId: number = 0;
    tehsilId: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}