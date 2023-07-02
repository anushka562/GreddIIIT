import express from 'express'
const app = express();
import dotenv from 'dotenv'
dotenv.config();
import 'express-async-errors' 
import morgan from 'morgan'

//db and authenticateUser
import connectDB from './db/connect.js';

//routers
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js'
import postRouter from './routes/postRoute.js'
import subgreddiiitRouter from './routes/subgreddiiitRoute.js'
import reportRouter from './routes/reportRoute.js';
import commentRouter from './routes/commentRoute.js';

//middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

import {dirname} from 'path'
import { fileURLToPath } from 'url';
import path from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

if(process.env.NODE_EVN !== 'production'){
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json())

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// app.get('/api/v1', (req, res)=>{
//     res.send('Welcome!!');
// })

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/subgreddiiit', subgreddiiitRouter);
app.use('/api/v1/report', reportRouter);
app.use('/api/v1/comment', commentRouter);

app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;


const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port, ()=>{
            console.log(`server is listening on port ${port}`);
        })
    } catch(error){
        console.log(error);
    }
}
start();