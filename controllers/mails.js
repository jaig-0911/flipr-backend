import express from 'express';
import mongoose from 'mongoose';

import mail from '../models/mails.js';

const router = express.Router();

export const getmails = async (req, res) => { 
    try {
        const mails = await mail.find();
        res.status(200).json(mails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createmail = async (req, res) => {
    const mail = req.body;
    const newmail = new mail({ ...mail, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newmail.save();

        res.status(201).json(newmail);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatemail = async (req, res) => {
    const { id } = req.params;
    const { scheduled } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedmail = { scheduled : false, _id: id };

    await mail.findByIdAndUpdate(id, updatedmail, { new: true });


    res.json(updatedmail);
}
 
export const deletemail = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await mail.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}


export default router;