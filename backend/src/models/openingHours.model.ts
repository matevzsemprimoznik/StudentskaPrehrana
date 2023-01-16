import {Schema} from "mongoose";

export interface IOpeningHours {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    holiday: string;
}

const OpeningHoursSchema = new Schema<IOpeningHours>({
    monday: {type: String, required: true},
    tuesday: {type: String, required: true},
    wednesday: {type: String, required: true},
    thursday: {type: String, required: true},
    friday: {type: String, required: true},
    saturday: {type: String, required: true},
    sunday: {type: String, required: true},
    holiday: {type: String, required: true},
})
export default OpeningHoursSchema

