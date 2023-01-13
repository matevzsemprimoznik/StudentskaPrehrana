import axios, {AxiosError} from 'axios'
import { REST_URI } from "@env"

const deleteAxios = async (url: string) => {
    console.log(`${REST_URI}${url}`)
    const {data} = await axios.delete(`${REST_URI}${url}`)
    return data
}
export default deleteAxios;