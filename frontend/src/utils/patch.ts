import axios, {AxiosError} from 'axios'
import { REST_URI } from "@env"

const patch = async (url: string, body: any) => {
    const {data} = await axios.patch(`${REST_URI}${url}`, body)
    return data
}
export default patch;