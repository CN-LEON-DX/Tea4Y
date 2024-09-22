// [GET] /home
const systemConfig = require("../../config/system");
const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/products.helper");
const Order = require("../../models/order.model");

module.exports.index = async (req, res) => {
  try {
    const cartID = req.cookies.cartID;
    const cart = await Cart.findById(cartID);
    if (!cart) {
      return res.status(404).send("Cart not found");
    }
    let totalPrice = 0;
    const cartProductsPromises = cart.products.map(async (element) => {
      const product = await Product.findById(element.productID);
      product.quantity = element.quantity;
      return product;
    });

    let cartProducts = await Promise.all(cartProductsPromises);

    cartProducts = productHelper.productsDisplay(cartProducts);
    cartProducts.forEach((item) => {
      totalPrice += item.quantity * item.newPrice;
    });

    res.render("client/pages/checkout/index", {
      cartProducts: cartProducts,
      pageTitle: "Carts",
      totalPrice: totalPrice,
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.order = async (req, res) => {
  try {
    const cartID = req.cookies.cartID;
    const userInfo = req.body;

    const cart = await Cart.findById(cartID);
    let products = [];

    for (item of cart.products) {
      const objProduct = {
        productID: item.productID,
        price: 0,
        discountPercentage: 0,
        quantity: item.quantity,
      };
      const prod = await Product.findOne({
        _id: item.productID,
      });

      objProduct.price = prod.price;
      objProduct.discountPercentage = prod.discountPercentage;

      products.push(objProduct);
    }

    const newOrder = new Order({
      cartID: cartID,
      userInfo: userInfo,
      products: products,
    });

    await newOrder.save();

    await Cart.updateOne(
      {
        _id: cartID,
      },
      {
        products: [],
      }
    );
    req.flash("success", "Order succesfully !");
    res.redirect(`/checkout/success/${newOrder.id}`);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

module.exports.success = async (req, res) => {
  const orderID = req.params.id;
  const order = await Order.findOne({ _id: orderID });

  console.log(order);

  const products = order.products;

  const newProducts = [];
  let totalPrice = 0;
  for (let prod of products) {
    const pro = await Product.findOne({ _id: prod.productID });
    prod.thumbnail = pro.thumbnail;
    prod.title = pro.title;
    prod.newPrice = ((1 - prod.discountPercentage / 100) * prod.price).toFixed(
      2
    );
    totalPrice += prod.newPrice * prod.quantity;
    newProducts.push(prod);
  }

  res.render("client/pages/checkout/success", {
    pageTitle: "Order",
    order: order,
    products: newProducts,
    totalPrice: totalPrice,
    prefixAdmin: systemConfig.prefixAdmin,
  });
};
