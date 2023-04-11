

export class Mandicommoditypricing{
    id: number = 0;
    price: number = 0;
    isApproved: boolean = false;
    approvedUserId: number = 0;
    effectiveStartDate:string='';
    effectiveEndDate:string='';
    effectiveStartTime: Date = new Date();
    effectiveEndTime: Date = new Date();
    mandiId: number = 0;
    commodityId: number = 0;
    unitId: number = 0;
    remark: string = '';
    retailPrice: number = 0;
    createdBy: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}