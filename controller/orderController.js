import { Safepay } from '@sfpy/node-sdk'
import Order from "../model/Order.js";
import Item from "../model/Item.js";
import Product from "../model/Product.js";
import Payment from "../model/Payment.js";
import stripe from "stripe";
import axios  from 'axios';
import SafePay from "../model/SafePay.js";

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
export const addToCart = async (req, res) => {
  try {
    const { productIds, subTotal, orderId } = req.body;

    if (orderId) {
      const existingOrder = await Item.findOne({ _id: orderId });

      if (!existingOrder) {
        return res.status(404).json({ code: 404, message: "Order not found" });
      }

      for (const item of productIds) {
        const product = await Product.findById(item.productId)

        if (!product) {
          return res.status(404).json({ code: 404, message: "Product not found" });
        }

        // if (product.stock < product.quantity) {
        //   return res.status(400).json({ code: 400, message: "Insufficient stock for product: " + product.name });
        // }

        existingOrder.productIds.push(item.productId);
      }

      existingOrder.subTotal = subTotal;

      const updatedOrder = await existingOrder.save();

      if (updatedOrder) {
        return res.status(201).json({ code: 201, message: "Order updated successfully", order: updatedOrder });
      } else {
        return res.status(500).json({ code: 500, message: "Failed to update order" });
      }
    }

    const newOrder = new Item({
      productIds: productIds,
      subTotal: subTotal,
    });

    for (const item of productIds) {
      const product = await Product.findById(item.productId);

    //   if (!product) {
    //     return res.status(404).json({ code: 404, message: "Product not found" });
    //   }

    //   // if (product.stock < product.quantity) {
    //   //   return res.status(400).json({ code: 400, message: "Insufficient stock for product: " + product.title });
    //   // }
   }

    const newItem = await newOrder.save();

    if (newItem) {
      return res.status(201).json({ code: 201, message: "Order created successfully", order: newItem });
    }
  } catch (error) {
    console.error(error);
    return res.status(error.code || 500).json({ code: error.code || 500, message: error.message || "Internal server error" });
  }
};

export const getAllOredrItems = async (req, res) => {
  try {
    const orders = await Item.find().populate("productIds");
    return res.status(200).json({ code: 200, order: orders, message: "successfully fetched data" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "internal server error" });
  }
};

export const getOrderItemById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Item.findById(orderId).populate("productIds.productId");
    if (!order) {
      return res.status(404).json({ code: 404, message: "Order not found" });
    }
    return res.status(200).json({ code: 200, order: order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

export const saveOrder = async (req, res) => {
  try {
    const _order = req.body;

    const newOrder = new Order({ ..._order });
    await newOrder.save();

    // const orderedItem = await Item.findById(_order.itemId);

    // if (!orderedItem) {
    //   return res.status(404).json({ code: 404, message: "Order Item not found" });
    // }

    // for (const productItem of orderedItem.productIds) {
    //   const product = await Product.findById(productItem.productId);
    //   if (product) {
    //     product.stock -= product.quantity;
    //     await product.save();
    //   }
    // }

    return res.status(201).json({ code: 201, message: "Order saved successfully", order: newOrder });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'safepays', 
          localField: 'safePayId',
          foreignField: '_id',
          as: 'safePay',
        },
      },
      {
        $lookup: {
          from: 'purchases', 
          localField: 'purchaseId',
          foreignField: '_id',
          as: 'purchase',
        },
      },
      {
        $addFields: {
          mergedPaymentInfo: {
            $cond: [
              { $eq: ['$payment_method', 'safepay'] },
              { $arrayElemAt: ['$safePay', 0] },
              { $arrayElemAt: ['$purchase', 0] },
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: 'mergedPaymentInfo.itemId',
          foreignField: '_id',
          as: 'item',
        },
      },
      {
        $lookup: {
          from: 'products', 
          localField: 'item.productIds.productId',
          foreignField: '_id',
          as: 'products',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'products.categoryId',
          foreignField: '_id',
          as: 'categories',
        },
      },
      {
        $lookup: {
          from: 'colors', 
          localField: 'products.colorId',
          foreignField: '_id',
          as: 'colors',
        },
      },
    ]);
    
   
    return res.status(200).json({
      code: 200,
      order: orders,
      message: "successfully fetched data",
    });
  } catch (error) {
    console.error(error);
    throw { code: 500, message: "internal server error" };
  }
};

export const stripePayment = async (req, res) => {
  try {
    const { product, token } = req.body;
    const uid = req.details.id;

    const price = product[0] ? product[0].price : null;
    const customer = await stripeInstance.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripeInstance.charges.create({
      amount: price * 100,
      currency: "pkr",
      customer: customer.id,
    });

   
    const payment = await Payment.create({
      amount: charge.amount,
      currency: charge.currency,
      customerId: charge.customer,
      uid: uid,
    });

    return res.status(200).json({
      code: 200,
      message: "Payment successful",
      result: payment,
    });
  } catch (error) {
    console.log(error);
    throw { code: 500, message: "internal server error" };
  }
};


export const safePay = async (req, res) => {
  try {
  
    const item = await Item.findById(req.body.itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    const safepay = new Safepay({
      environment: req.body.environment,
      apiKey:process.env.PUBLIC_KEY,
      v1Secret: 'bar',
      webhookSecret: 'foo'
    })
    const { token } = await safepay.payments.create({
      amount: item.subTotal,
      currency: req.body.currency
    })
    const url = safepay.checkout.create({
      token,
      orderId: req.body.itemId,
      cancelUrl: 'http://example.com/cancel',
      redirectUrl: 'http://example.com/success',
      source: 'custom',
      webhooks: true
    })
    const newSafePay = new SafePay({
      currency:req.body.currency,
      itemId: req.body.itemId
  });
  await newSafePay.save();

  res.status(200).json({ success: true, url });
  
  } catch (error) {
    console.error('Error initiating payment:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};




export const createPurchase = async (req, res) => {
    try {
        const { itemId, paymentMethod,status } = req.body;
        const newPurchase = new Purchase({
            itemId,
            paymentMethod,
            status
        });

        const savedPurchase = await newPurchase.save();
        res.status(201).json(savedPurchase);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Function to update purchase status
export const updatePurchaseStatus = async (req, res) => {
    try {
        const { purchaseId } = req.params;
        const { status } = req.body;

        const updatedPurchase = await Purchase.findByIdAndUpdate(purchaseId, { status }, { new: true });

        if (!updatedPurchase) {
            return res.status(404).json({ error: 'Purchase not found' });
        }

        res.status(200).json(updatedPurchase);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};
