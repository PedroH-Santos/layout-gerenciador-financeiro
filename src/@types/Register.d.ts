import { StatusRegister } from "@/enum/StatusRegister";


export type Register = {
    id: string;
    name: string;
    price: number;
    status: StatusRegister;
    groupId: string;
    createdAt: string;
}