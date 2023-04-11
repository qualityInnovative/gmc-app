import { Profile } from "./profile";
export class UserProfile {
    id: number = 0;
    email: string = '';
    password: string = '';
    roleId: number = 0;
    token: string = '';
    profileId: number = 0;
    Profile: Profile = new Profile();
}