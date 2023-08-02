import { CorporateDiscount } from './corporateDiscount';
import { Corporation } from './corporation';
import { Unit } from './unit';
export class CorporateRates {
  id: number=0;
  name: string="";
  mrp: number=0;
  description: string="";
  corporateprice: number=0;
  corporationId: number = 0;
  image!: string;
  coprativeCategoryId: number   = 0;
  unitId: number = 0;
  CorporateCommoditydiscount!: CorporateDiscount;
  Corporation: Corporation=new Corporation();
  Unit: Unit=new Unit();
}