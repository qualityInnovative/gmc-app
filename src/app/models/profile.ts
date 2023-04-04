export class Profile {
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    contact: string = '';
    aadarNumber: string = '';
    address: string = '';
    city: string = '';
    stateId: number = 0;
    districtId: number = 0;
    departmentId: number = 0;
    designationId: number = 0;
    mandiId!: number;
    image: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    userId: number = 0;
}