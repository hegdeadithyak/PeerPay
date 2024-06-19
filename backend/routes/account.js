const express = require("express");
const { authmiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose  = require("mongoose")

const router = express.Router();

router.get("/balance", authmiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        console.log(account);
        if(account && account.balance){
            res.json({
                balance: account.balance
            });
        } else {
            res.status(404).json({
                message: "Account not found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.post("/transfer", authmiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;