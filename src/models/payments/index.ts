import { IPayment } from "../../types/payments"
import { model, Schema } from "mongoose"

const paymentSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        link: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default model<IPayment>("Payment", paymentSchema)
