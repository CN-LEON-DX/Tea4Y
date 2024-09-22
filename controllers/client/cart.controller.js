// POST // cart/add/:id
const systemConfig = require("../../config/system");
const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/products.helper");
module.exports.addPostProduct = async (req, res) => {
  try {
    const cartID = req.cookies.cartID;
    const productID = req.params.id;
    const quantity = parseInt(req.body.quantity);

    const cart = await Cart.findById(cartID);

    const existProductInCart = cart.products.find(
      (item) => item.productID === productID
    );

    if (existProductInCart) {
      await Cart.updateOne(
        {
          _id: cartID,
          "products.productID": productID,
        },
        {
          $set: {
            "products.$.quantity": quantity + existProductInCart.quantity,
          },
        }
      );
    } else {
      const objCart = {
        productID: productID,
        quantity: quantity,
      };
      await Cart.updateOne(
        {
          _id: cartID,
        },
        {
          $push: { products: objCart },
        }
      );
    }

    req.flash("success", "Added product to cart successfully!");
    res.redirect("back");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
};

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

    res.render("client/pages/cart/index", {
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

module.exports.deleteProduct = async (req, res) => {
  const productID = req.params.id;
  try {
    const cartID = req.cookies.cartID;
    await Cart.updateOne(
      {
        _id: cartID,
      },
      {
        $pull: { products: { productID: productID } },
      }
    );
    req.flash("success", "Delete product success !");
    res.redirect("back");
  } catch (e) {
    console.log(e);
  }
};

module.exports.updateQuantities = async (req, res) => {
  try {
    const cartID = req.cookies.cartID;
    const { products } = req.body;

    for (const { productID, quantity } of products) {
      await Cart.updateOne(
        {
          _id: cartID,
          "products.productID": productID,
        },
        {
          $set: { "products.$.quantity": quantity },
        }
      );
    }
    req.flash("success", "Updated quantities successfully!");
    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
};
