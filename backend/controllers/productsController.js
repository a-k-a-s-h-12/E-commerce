const Product = require("../models/productModel");

exports.addProducts = async (req, res, next) => {
  try {
    // console.log(req);
    const { name, brand, quantity, category, description, price } = req.fields;
    //   console.log(req.fields);
    //     {
    //   image: '/uploads\\image-1720453556668.jpg',
    //   name: 'askfavuhvf',
    //   description: 'tests',
    //   price: '33',
    //   category: '668804e27495ec01384d1c52',
    //   quantity: '1',
    //   brand: 'test',
    //   countInStock: '1'
    //  }
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const product = await Product.create(req.fields);
    res.json(product);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

exports.updateProductDetails = async (req, res, next) => {
  try {
    const { name, brand, quantity, category, description, price } = req.fields;
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      {
        new: true,
        runvalidator: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
exports.removeProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const removedProduct = await Product.findByIdAndDelete(id);
    res.json(removedProduct);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
exports.fetchProducts = async (req, res, next) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
exports.fetchById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      return res.status(404).json({ Error: "Product Not Found" });
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
exports.fetchAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .limit(12)
      .sort({ createAt: -1 })
      .populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
exports.addProductReviews = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const productid = req.params.id;
    const product = await Product.findById(productid);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      //id the user is already reviewed also errro res
      
      if (alreadyReviewed) {
        return res.status(400).json({ Error: "Product is Already Reviewed" });
      } else {
        const review = {
          name: req.user.userName,
          rating: Number(rating),
          comment: comment,
          user: req.user._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;

        await product.save();
        res.status(200).json({ Message: "Review Added" });
      }
    } else {
      return res.status(404).json({ Error: "Product Not Found" });
    }
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
exports.fetchTopProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
exports.fetchNewProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(5);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};
exports.filterProduct = async (req, res, next) => {
  try {
    const { checked, radio } = req.body;
    // req.body looks like
    // {
    //   "checked": ["electronics", "books"],
    //   "radio": [10, 50]
    // }
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    // at this point args lookslike
    // {
    //   category: ["electronics", "books"],
    //   price: { $gte: 10, $lte: 50 }
    // }
    const product = await Product.find(args);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
