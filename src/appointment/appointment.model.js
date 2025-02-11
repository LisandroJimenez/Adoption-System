import { Schema, model } from "mongoose";

const AppointmentSchema = new Schema(
    {
        date: {
            type: Date,
            required: [true, "Date is required"]
        },
        hour: {
            type: String, 
            required: [true, "Hour of appointment is required"]
        },
        keeper: {
            type: Schema.Types.ObjectId,
            refPath: 'user', 
            required: true
        },
        pet: { 
            type: Schema.Types.ObjectId, 
            enum: 'pet', 
            required: true 
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)



export default model ('Appointment',AppointmentSchema );