import Axios from "axios"
import { getToken } from "./userUtil"

export const setAuthToken = (token) => {
    if(token){
        Axios.defaults.headers.common["x-auth-token"] = getToken();
    }
    else{
        delete Axios.defaults.headers.common["x-auth-token"];
    }
}