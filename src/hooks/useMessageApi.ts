import { useState } from "react";


export enum StatusMessageApi {
    SUCCESS,
    ERROR
}


type MessageApi = {
    status: StatusMessageApi,
    message: string;
}




export function useMessageApi(){
    const [messageApi, setMessageApi] = useState<MessageApi>();


    function insertNewMessage(status: StatusMessageApi, message: string){
        const newMessageApi : MessageApi = { 
            status,
            message,
        }
        setMessageApi(newMessageApi);
    }


    return {
        messageApi,
        insertNewMessage,
    }

}