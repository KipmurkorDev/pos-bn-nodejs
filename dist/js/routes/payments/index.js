"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payments_1 = require("../../controllers/payments");
const router = (0, express_1.Router)();
router.get("/payments", payments_1.getPayments);
router.post("/add-payment", payments_1.addPayment);
router.put("/edit-payment/:id", payments_1.updatePayment);
router.delete("/delete-payment/:id", payments_1.deletePayment);
exports.default = router;
