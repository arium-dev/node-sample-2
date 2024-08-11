import Product from "../model/Product.js";
export const createProduct = async (req, res) => {
  try {
    const _product = req.body;

    if (_product.sale && _product.discountedPrice === undefined) {
      return res.status(400).json({ code: 400, message: 'Discount price is required when the product is on sale' });
    }
 
    const images = req.files?.map(file => file?.path);

    const newProduct = await Product.create({
      ..._product,
      images
    });

    return res.status(200).json({
      code: 200,
      product: newProduct,
      message: 'Product Created Successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: 'Internal server error.' });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("colorId", "name -_id")
      .populate("categoryId");

    if (!products || products.length === 0) {
      return res.status(404).json({ code: 404, message: "Products not Found" });
    }

    return res.status(200).json({
      code: 200,
      message: "Products Found",
      products: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      return res.status(200).json({
        code: 200,
        message: "Successfully Deleted Product",
        data: deletedProduct,
      });
    } else {
      return res.status(404).json({ code: 404, message: "Product not Found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id; 
    const _product = req.body;

    if (_product.sale && _product.discountedPrice === undefined) {
      return res.status(400).json({ code: 400, message: 'Discount price is required when the product is on sale' });
    }
    const images = req.files?.map(file => file?.path);
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      ..._product,
      images
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ code: 404, message: 'Product not found' });
    }

    return res.status(200).json({
      code: 200,
      product: updatedProduct,
      message: 'Product updated successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error." });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findOne({ _id }).populate('colorId');
    if (!product) {
      return res.status(404).json({ code: 404, message: "Product not Found" });
    }
    return res.status(200).json({
      code: 200,
      message: "product Found",
      product: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

