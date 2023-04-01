import { createContext, ReactElement, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router, { useRouter } from "next/router";
import { api } from "@/services/axios";
import { User } from "@/@types/User";
export const AuthContext = createContext({} as AuthContextType);

interface AuthContextType {
    isAuthenticated: Boolean;
    user: User | undefined;
    signIn: (data: SignInData) => Promise<void>
    refreshDataUser: () => Promise<void>

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
    user: {
        userId: string;
        userName: string;
    };
}

interface ResponseGetNewUser {
    user: User;
}


export function AuthProvider({ children }: AuthContextProps) {

    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;
    async function signIn({ username, password }: SignInData) {
        const response = await api.post<ResponseToken>('/login', {
            username,
            password
        });
        createCookiesToken(response.data); 
        Router.push('/group/list');
    }


    async function createCookiesToken(data: ResponseToken){
        setCookie(undefined, 'managerFinancial.token', data.access_token, {
            maxAge: 60 * 15, //15 minutes
            path: '/'
        });
        setCookie(undefined, 'managerFinancial.refreshToken', data.refresh_token, {
            maxAge: 60 * 60 * 24, //1 hour
            path: '/'
        });
        await getNewUser(data.access_token);

    }

    async function requestRefreshToken(refreshToken: string){
        const newToken = await api.get<ResponseToken>('/login/refresh', {
            headers: { 'Authorization': 'Bearer ' + refreshToken },
        })
        createCookiesToken(newToken.data);
    }

    async function getNewUser(token: string | undefined){
        if (token){
            const response = await api.get<ResponseGetNewUser>(`/login/profile`, {
                headers: { 'Authorization': 'Bearer ' + token },
            });
            setUser(response.data.user);

        } 

    }

    async function refreshDataUser(){
        const { 'managerFinancial.token': token } = parseCookies();
        getNewUser(token);
    }

    useEffect(() => {
        const { 'managerFinancial.token': token } = parseCookies();
        if (token) {
            //buscar os dados do usuário atualizado backend
            getNewUser(token);
            
        }else{  
            const { 'managerFinancial.refreshToken': refreshToken } = parseCookies();
            if (refreshToken) {
                requestRefreshToken(refreshToken);   
            }else {
                Router.push('/login');
            }

        }  
    }, []);

    
    return (
        <AuthContext.Provider value={{ user, signIn, isAuthenticated, refreshDataUser }}>
            {children}
        </AuthContext.Provider>
    )
}
