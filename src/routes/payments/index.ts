import { Router } from "express"
import { getPayments, addPayment, updatePayment, deletePayment } from "../../controllers/payments"
import { authenticateToken } from '../jwt'

const router: Router = Router()

router.get("/payments", authenticateToken, getPayments)

router.post("/add-payment", authenticateToken, addPayment)

router.put("/edit-payment/:id", authenticateToken, updatePayment)

router.delete("/delete-payment/:id", authenticateToken, deletePayment)

export default router