import express from 'express';
import router from './routes.js';
import {connectDB} from './db.js';
const app = express();

app.use(express.json());

app.use('/',router);

app.listen(3000,()=>{
    connectDB();
    console.log('Server Running on PORT:3000');
})

