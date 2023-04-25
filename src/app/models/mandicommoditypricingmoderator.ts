import {Mandi} from './mandi';
import {Commodity} from './commodity';
export class Mandicommoditypricingmoderator{
    Mandi: Mandi = new Mandi();
    Commodity: Commodity = new Commodity();
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
    remark: string = '';
    retailPrice: number = 0;
    unitId: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    createdBy: number = 0;
}