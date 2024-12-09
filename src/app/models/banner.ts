export class Banner {
    id: number = 0;
    title: string="";
    description: string="";
    image: string="";
    link!: string;
    status: boolean=false;
    createdBy: number = 0;
    stateId: number = 0;
    startDate!: string;
    endDate: string="";
    view: number = 0;
    createdAt!: Date;
    updatedAt!: Date;
}
