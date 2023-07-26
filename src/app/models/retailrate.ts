import { Mandi } from "./mandi";
import { Commodity } from "./commodity";
import { Unit } from "./unit";
import { District } from "./district";
export class RetailRate {
    id: number = 0;
    commodityId: number = 0;
    districtId: number = 0;
    mandiId: number = 0;
    unitId: number = 0;
    retailPrice: number | undefined;
    mandiPrice: number | undefined;
    effectiveStartDate: Date = new Date();
    effectiveEndDate: Date = new Date();
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    createdBy: number = 0;
    corporateId: number = 0;
    corporatePrice: number | undefined;
    approvedByUserId: number = 0;
    Commodity: Commodity = new Commodity();
    Mandi: Mandi = new Mandi();
    Unit: Unit = new Unit();
    District: District = new District();
}