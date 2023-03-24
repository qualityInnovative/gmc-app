export class Mandicommoditypricing{
    id: number = 0;
    price: number = 0;
    isApproved: boolean = false;
    approvedUserId: number = 0;
    effectiveStartDate: Date = new Date();
    effectiveEndDate: Date = new Date();
    effectiveStartTime: Date = new Date();
    effectiveEndTime: Date = new Date();
    mandiId: number = 0;
    commodityId: number = 0;
    unitId: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}