import { OfficeEnum } from "./enums/users.office.enum";

export interface Users {
    name: string;
    password: string;
    email: string;
    office: OfficeEnum;
}