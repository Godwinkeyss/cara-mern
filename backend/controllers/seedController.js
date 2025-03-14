import data from '../data.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const seedController = async (req, res) => {
  try {
    await User.deleteMany();
    const user = await User.insertMany(data.users);

    await Product.deleteMany();
    const products = await Product.insertMany(data.products);

    return res.status(200).send({ user, products });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
