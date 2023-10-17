import { Router } from "express"
import { getPayments, addPayment, updatePayment, deletePayment } from "../../controllers/payments"
import { deposit } from '../../controllers/payments/MPESA/deposit'
import { withdraw, callback } from '../../controllers/payments/MPESA/withdraw'

import { getMpesaCredentials } from '../../controllers/payments/MPESA/credentials'
import { authenticateToken } from '../jwt'
// import paginate from '../../middlewares/paginate'

const router: Router = Router()

router.get("/payments", authenticateToken, getPayments)

router.post("/payments/deposit", getMpesaCredentials, deposit)
router.post("/payments/withdraw", getMpesaCredentials, withdraw)
router.post("/callback", callback)

router.post("/add-payment", authenticateToken, addPayment)

router.put("/edit-payment/:id", authenticateToken, updatePayment)

router.delete("/delete-payment/:id", authenticateToken, deletePayment)

export default router