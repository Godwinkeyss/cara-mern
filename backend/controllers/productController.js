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
