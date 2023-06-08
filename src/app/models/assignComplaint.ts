export class AssignComplaint {
    id: number = 0;
    assignedTo: string = '';
    complaintId: number = 0;
    complaintStatusId: number|string = 0;
    remarks: string = '';
    createdBy: number = 0;
    isDeleted: boolean = false;
    createdAt: Date = new Date();
    updatedAt: Date = new Date(); 
}