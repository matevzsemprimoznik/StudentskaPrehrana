import axios, {AxiosError} from 'axios'
import { REST_URI } from "@env"

const fetch = async (url: string) => {
    const {data} = await axios.get(`${REST_URI}${url}`)
    console.log(data);
    return data
}
export default fetch;