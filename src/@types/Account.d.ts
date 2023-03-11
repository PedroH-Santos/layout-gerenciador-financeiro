

export type Account = {
    id: string;
    name: string;
    price: number;
    dayDueDate: number;
    priceInstallments: number;
    installments: number;
    groupId: string;
    type: TypeAccount;
    status: StatusAccount;
    createdAt: string;
}