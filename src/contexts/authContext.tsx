import { createContext, ReactElement, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "@/services/axios";
import { User } from "@/@types/User";
export const AuthContext = createContext({} as AuthContextType);

interface AuthContextType {
    isAuthenticated: Boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<void>

}

interface AuthContextProps {
    children: ReactElement
}

interface SignInData {
    username: string;
    password: string;
}

interface ResponseToken {
    access_token: string;
    refresh_token: string;
    user: User;
}


export function AuthProvider({ children }: AuthContextProps) {

    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;
    async function signIn({ username, password }: SignInData) {
        const response = await api.post<ResponseToken>('/login', {
            username,
            password
        });
        setCookie(undefined, 'managerFinancial.token', response.data.access_token, {
            maxAge: 60 * 15 //15 minutes
        });
        setCookie(undefined, 'managerFinancial.refreshToken', response.data.refresh_token, {
            maxAge: 60 * 60 * 24 //1 hour
        });
        setUser(response.data.user);
        Router.push('/group/list');
    }

    useEffect(() => {
        const { 'managerFinancial.token': token } = parseCookies();
        if (token) {
            //buscar os dados do usuário atualizado backend
        }else{ 
            const { 'managerFinancial.refreshToken': refreshToken } = parseCookies();
            //fazer lógica para pegar um novo token
            
        }   

    }, []);

    return (
        <AuthContext.Provider value={{ user, signIn, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
