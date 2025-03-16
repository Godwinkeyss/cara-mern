import expressAsyncHandler from 'express-async-handler';
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
        console.log(err)
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

export const getCategories = expressAsyncHandler(async(req, res)=>{
    try{
        const categories = await Product.find().distinct('category')
        res.status(200).send(categories)
    }catch(err){
        res.status(500).send({message:'Something went wrong'})
    }
})
const PAGE_SIZE = 4;
export const search = expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })