export class AssignComplaint {
    id: number = 0;
    assignedTo: string = '';
    complaintId: number = 0;
    remarks: string = '';
    isDeleted: boolean = false;
    createdAt: Date = new Date();
    updatedAt: Date = new Date(); 
}