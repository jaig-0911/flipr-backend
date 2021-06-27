import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mailRouters from './routes/mails.js'
import userRouters from './routes/user.js'

const app = express();
dotenv.config();

app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(express.json({limit: "30mb", extended: true}));
app.use(cors());

app.use('/mail', mailRouters);
app.use('/user', userRouters);


app.get('/', (req, res) =>{
    res.send("Hello there!!!")
});

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser : true, 
    useUnifiedTopology : true, 
    useCreateIndex : true,
    useFindAndModify : false
})
.then(() => app.listen(PORT, () => console.log(`Server is listening on port :${PORT}`)))
.catch((err) => console.error("#" + err.message))

