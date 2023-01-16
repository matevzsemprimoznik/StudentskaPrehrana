import {AxiosError} from "axios/index";

interface HttpData {
    status: number;
    message: string;
}

interface HttpError extends AxiosError<HttpData>{}

export default HttpError;
