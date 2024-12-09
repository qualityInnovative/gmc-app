import { Department } from "./department";
import {DepartmentGrevanceCategory} from "./DepartmentGrevanceCategory";

export class DepartmentGrevanceSubCategory {
    id: number = 0;
    name: string = "";
    description:string="";
    createdAt: string = "";
    updatedAt: string = "";
    departmentId:string="";
    department:Department=new Department()
    categoryId: string = "";
    parentCategory:DepartmentGrevanceCategory=new DepartmentGrevanceCategory();
}