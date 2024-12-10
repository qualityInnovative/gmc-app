export class Complaint{
    id: number = 0;
    ComplaintId: number = 0;
    bussinessName: string = '';
    bussinessAddress: string = '';
    bussinessCordinates: string = '';
    bussinessPhone: string = '';
    bussinessDescription: string = '';
    mediaType: string = '';
    media: string = '';
    isDeleted: boolean = false;
    complainUniqueId: string = '';
    createdAt: string = '';
    updatedAt: string = '';
    latitude: string = '';
    longitude: string = '';
    departmentId:number=0;
    User:AcogsUser = new AcogsUser();
    districtId: number = 0;
    assignedTo: number = 0;
}
class AcogsUser {
    id: number = 0;
    mobileNumber: string = '';
    role: number = 0;
    verified: boolean = false;
    token: string = '';
    Profile: Profile = new Profile();
}
class Profile {
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    image: string = '';
    stateId: number = 0;
    districtId: number = 0;
    createdAt: string = '';
    updatedAt: string = '';
    UserId: number = 0;
}
