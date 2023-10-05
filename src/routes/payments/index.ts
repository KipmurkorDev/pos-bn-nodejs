import { Router } from "express"
import { getPayments, addPayment, updatePayment, deletePayment } from "../../controllers/payments"

const router: Router = Router()

router.get("/payments", getPayments)

router.post("/add-payment", addPayment)

router.put("/edit-payment/:id", updatePayment)

router.delete("/delete-payment/:id", deletePayment)

export default router