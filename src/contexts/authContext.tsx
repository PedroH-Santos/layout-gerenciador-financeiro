import { createContext, ReactElement, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router, { useRouter } from "next/router";
import { api } from "@/services/axios";
import { User } from "@/@types/User";
export const AuthContext = createContext({} as AuthContextType);

interface AuthContextType {
    isAuthenticated: Boolean;
    user: User;
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


    function createCookiesToken(data: ResponseToken){
        setCookie(undefined, 'managerFinancial.token', data.access_token, {
            maxAge: 60 * 15, //15 minutes
            path: '/'
        });
        setCookie(undefined, 'managerFinancial.refreshToken', data.refresh_token, {
            maxAge: 60 * 60 * 24, //1 hour
            path: '/'
        });
        getNewUser(data.user.userId,data.access_token);
    }

    async function requestRefreshToken(refreshToken: string){
        const newToken = await api.get<ResponseToken>('/login/refresh', {
            headers: { 'Authorization': 'Bearer ' + refreshToken },
        })
        createCookiesToken(newToken.data);
    }

    async function getNewUser(id: string | undefined, token: string){
        if(id){
            const response = await api.get<ResponseGetNewUser>(`/users/one/${id}`, {
                headers: { 'Authorization': 'Bearer ' + token },
            });
            setUser(response.data.user);
            console.log(user);
            console.log(response.data.user);
        } 

    }
    useEffect(() => {
        const { 'managerFinancial.token': token } = parseCookies();
        if (token) {
            //buscar os dados do usuário atualizado backend
            getNewUser(user?.id,token);
        }else{ 
            const { 'managerFinancial.refreshToken': refreshToken } = parseCookies();
            if (refreshToken) {
                requestRefreshToken(refreshToken);   
            }else {
                Router.push('/login');
            }

        }  
        console.log(user); 
    }, []);


    
    return (
        <AuthContext.Provider value={{ user, signIn, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
