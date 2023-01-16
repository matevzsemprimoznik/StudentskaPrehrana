import axios, {AxiosError} from 'axios'
import { REST_URI } from "@env"
import instance from "./axios";

const deleteAxios = async (url: string) => {
    console.log(`${REST_URI}${url}`)
    const {data} = await instance.delete(`${REST_URI}${url}`)
    return data
}
export default deleteAxios;