import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'cors'
import productRouter from './routes/product.js'
import seedRouter from './routes/seed.js'
import authRouter from './routes/auth.js'
import orderRouter from './routes/orderRoutes.js';
import userRouter from './routes/user.js';
import Stripe from 'stripe';

dotenv.config()
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express()



app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

export const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('db connected')
    }catch(err){
     console.log(err)
    }
    
}

app.get('/api/keys/paypal', (req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use('/api/products/', productRouter)
app.use('/api/orders/', orderRouter)
app.use('/api/seed', seedRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)



const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist'))); // Vite uses 'dist' after build

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

  
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`server is running on http://127.0.0.1:${PORT}`)
    connectDb()
})