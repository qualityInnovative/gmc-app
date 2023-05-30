export class Notification{
    id: number = 0;
    UserId: number = 0;
    title: string = '';
    type: string = '';
    description: string = '';
    isDeleted: boolean = false;
    notificationUniqueId: number = 0;
    read: boolean = false;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();



}