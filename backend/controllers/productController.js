import expressAsyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

const PAGE_SIZE = 4;

export const createProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const newProduct = new Product(product);

    const savedProduct = await newProduct.save();
    res.status(201).json({ msg: 'Product Created Successfully', savedProduct });
  } catch (err) {
    console.log(err);
  }
};

export const getAllProduct = async (req, res) => {
  const PAGE_SIZE = 4;

  try {
    const { query } = req;
    const page = Math.max(Number(query.page) || 1, 1); // Ensure page is at least 1
    const pageSize = Math.max(Number(query.pageSize) || PAGE_SIZE, 1); // Ensure pageSize is at least 1

    // 🔹 Filtering
    const filter = {};
    if (query.category) {
      filter.category = query.category;
    }
    if (query.keyword) {
      filter.name = { $regex: query.keyword, $options: "i" }; // Case-insensitive search
    }
    if (query.minPrice || query.maxPrice) {
      filter.price = {
        ...(query.minPrice ? { $gte: Number(query.minPrice) } : {}),
        ...(query.maxPrice ? { $lte: Number(query.maxPrice) } : {}),
      };
    }

    // 🔹 Sorting
    const sortOrder = 
      query.sort === "price" ? { price: 1 } : 
      query.sort === "rating" ? { rating: -1 } : 
      query.sort === "popularity" ? { sold: -1 } : 
      { createdAt: -1 }; // Default: Newest first

    // 🔹 Fetch Products with Filters & Sorting
    const products = await Product.find(filter)
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments(filter);
    console.log(`Total Products: ${countProducts}, Pages: ${Math.ceil(countProducts / pageSize)}`);
    res.status(200).send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

// export const getAllProduct = async (req, res) => {
//   const PAGE_SIZE = 10
//   try {
//     const { query } = req;
//     const page = Number(query.page) || 1;
//     const pageSize = Number(query.pageSize) || PAGE_SIZE;
//     // const products = await Product.find();
//     // res.status(200).send(products);
//     const products = await Product.find()
//     .skip(pageSize * (page - 1))
//     .limit(pageSize);
//   const countProducts = await Product.countDocuments();
//   res.status(200).send({
//     products,
//     countProducts,
//     page,
//     pages: Math.ceil(countProducts / pageSize),
//   });
//   } catch (err) {
//     res.status(500).send({ message: 'Something went wrong' });
//     console.log(err);
//   }
// };

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).send({ message: 'Product does not exist' });
    }
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);
    res.status(200).send({ product, relatedProducts });
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};
export const getSingleProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).send({ message: 'Product does not exist' });
    }
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);
    res.status(200).send({ product, relatedProducts });
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};

export const getCategories = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Product.find().distinct('category');
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

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
});

export const getAdminProduct = expressAsyncHandler(async (req, res) => {
  const { query } = req;
  const page = query.page || 1;
  const pageSize = query.pageSize || PAGE_SIZE;

  const products = await Product.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  const countProducts = await Product.countDocuments();
  res.send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
});
