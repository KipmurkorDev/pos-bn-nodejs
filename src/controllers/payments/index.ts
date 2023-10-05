import { Response, Request } from "express"
import { IPayment } from "../../types/payments"
import Payment from "../../models/payments"

const getPayments = async (req: Request, res: Response): Promise<void> => {
    try {
        const payments: IPayment[] = await Payment.find()
        res.status(200).json({ payments })
    } catch (error) {
        throw error
    }
}

const addPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IPayment, "name" | "description" | "link">


        const payment: IPayment = new Payment({
            name: body.name,
            description: body.description,
            link: body.link,
        })


        const newPayment: IPayment = await payment.save()
        const allPayments: IPayment[] = await Payment.find()

        res
            .status(201)
            .json({ message: "Payment added", payment: newPayment, payments: allPayments })
    } catch (error) {
        throw error
    }
}

const updatePayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updatePayment: IPayment | null = await Payment.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allPayments: IPayment[] = await Payment.find()
        res.status(200).json({
            message: "Payment updated",
            payment: updatePayment,
            payments: allPayments,
        })
    } catch (error) {
        throw error
    }
}

const deletePayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedPayment: IPayment | null = await Payment.findByIdAndRemove(
            req.params.id
        )
        const allPayments: IPayment[] = await Payment.find()
        res.status(200).json({
            message: "Payment deleted",
            payment: deletedPayment,
            payments: allPayments,
        })
    } catch (error) {
        throw error
    }
}

export { getPayments, addPayment, updatePayment, deletePayment }



