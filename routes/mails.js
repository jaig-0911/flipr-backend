import express from 'express';

import { getmails, createmail, updatemail, deletemail } from '../controllers/mails.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getmails);
router.post('/',auth,  createmail);
router.patch('/:id', auth, updatemail);
router.delete('/:id', auth, deletemail);

export default router;
