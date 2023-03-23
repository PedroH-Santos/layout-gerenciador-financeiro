

export type AccountRegister = {
    id: string;
    name: string;
    price: number;
    dueDate: string;
    accountId: string;
    accounts: Account;
    status: StatusAccount;
    createdAt: string;
}