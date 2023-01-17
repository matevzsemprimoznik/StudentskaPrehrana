import axios, {AxiosError} from 'axios'
import { REST_URI } from "@env"
import instance from "./axios";

const fetch = async (url: string) => {
    console.log(`${REST_URI}${url}`)
    const {data} = await instance.get(`${REST_URI}${url}`)
    console.log(data);
    return data
}
export default fetch;