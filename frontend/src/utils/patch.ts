import axios, {AxiosError} from 'axios'
import { REST_URI } from "@env"
import instance from "./axios";

const patch = async (url: string, body: any) => {
    const {data} = await instance.patch(`${REST_URI}${url}`, body)
    return data
}
export default patch;