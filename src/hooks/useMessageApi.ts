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
    const [messageApi, setMessageApi] = useState<MessageApi | undefined>();


    function insertNewMessage(status: StatusMessageApi, message: string){
        const newMessageApi : MessageApi = { 
            status,
            message,
        }
        setMessageApi(newMessageApi);
    }

    function deleteNewMessage(){
        setMessageApi(undefined);
    }


    return {
        messageApi,
        insertNewMessage,
        deleteNewMessage
    }

}