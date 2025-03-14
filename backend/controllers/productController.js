import Product from '../models/Product.js';
export const createProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const newProduct = new Product(product);

    const savedProduct = await newProduct.save();
    res.status(201).json({ msg: 'Product Created Successfully', savedProduct });
  } catch (err) {
    console.log(err)
  }
};

export const getAllProduct = async(req,res)=>{
    try{
     const products = await Product.find()
     res.status(200).send(products)
    }catch(err){
        res.status(500).send({message:'Something went wrong'})
    }
}

export const getSingleProduct = async(req,res)=>{
    try{
        const product = await Product.findOne({slug:req.params.slug})
        if(!product){
            return res.status(404).send({message:'Product does not exist'})
        }
        const relatedProducts = await Product.find({category:product.category, _id:{$ne:product._id}}).limit(4)
        res.status(200).send({product, relatedProducts})
       }catch(err){
           res.status(500).send({message:'Something went wrong'})
       }
}
export const getSingleProductById = async(req,res)=>{
    try{
        const product = await Product.findOne({_id:req.params.id})
        if(!product){
            return res.status(404).send({message:'Product does not exist'})
        }
        const relatedProducts = await Product.find({category:product.category, _id:{$ne:product._id}}).limit(4)
        res.status(200).send({product, relatedProducts})
       }catch(err){
           res.status(500).send({message:'Something went wrong'})
       }
}