"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.addPayment = exports.getPayments = void 0;
const payments_1 = __importDefault(require("../../models/payments"));
const getPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield payments_1.default.find();
        res.status(200).json({ payments });
    }
    catch (error) {
        throw error;
    }
});
exports.getPayments = getPayments;
const addPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const payment = new payments_1.default({
            name: body.name,
            description: body.description,
            link: body.link,
        });
        const newPayment = yield payment.save();
        const allPayments = yield payments_1.default.find();
        res
            .status(201)
            .json({ message: "Payment added", payment: newPayment, payments: allPayments });
    }
    catch (error) {
        throw error;
    }
});
exports.addPayment = addPayment;
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updatePayment = yield payments_1.default.findByIdAndUpdate({ _id: id }, body);
        const allPayments = yield payments_1.default.find();
        res.status(200).json({
            message: "Payment updated",
            payment: updatePayment,
            payments: allPayments,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updatePayment = updatePayment;
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPayment = yield payments_1.default.findByIdAndRemove(req.params.id);
        const allPayments = yield payments_1.default.find();
        res.status(200).json({
            message: "Payment deleted",
            payment: deletedPayment,
            payments: allPayments,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deletePayment = deletePayment;
