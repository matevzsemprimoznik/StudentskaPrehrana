import axios, {AxiosError} from 'axios'
import { REST_URI } from "@env"

const post = async (url: string, body: any) => {
    console.log(`${REST_URI}${url}`)
    const {data} = await axios.post(`${REST_URI}${url}`, body)
    return data
}
export default post;