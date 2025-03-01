import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productRouter from './routes/product.js'
const app = express()

dotenv.config()
app.use(express.json())

export const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('db connected')
    }catch(err){
     console.log(err)
    }
    
}


app.use('/api/products/', productRouter)






const PORT = 5000 || process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server is running on http://127.0.0.1:${PORT}`)
    connectDb()
})