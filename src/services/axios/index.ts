import axios from "axios";
import getConfig from 'next/config';
import { Router, useRouter } from "next/router";
import { parseCookies } from "nookies";

const { publicRuntimeConfig } = getConfig();

export function getApiClient(ctx?: any){
    const { 'managerFinancial.token': token } = parseCookies(ctx);
    console.log(token);
    const api = axios.create({
        baseURL: publicRuntimeConfig.apiURL,
    })
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    

    return api;
}

export const api = getApiClient();