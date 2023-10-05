import { Document } from "mongoose"

export interface IPayment extends Document {
  name: string
  description: string
  link: string
}
