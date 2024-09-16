// POST // cart/add/:id
const Cart = require("../../models/cart.model");

module.exports.addPostProduct = async (req, res) => {
  try {
    const cartID = req.cookies.cartID;
    const productID = req.params.id;
    const quantity = parseInt(req.body.quantity);

    const cart = await Cart.findById(cartID);

    const existProductInCart = cart.products.find((item) => item.productID);

    if (existProductInCart.length > 0) {
      console.log(existProductInCart);
      console.log("Run exits");
      await Cart.updateOne(
        {
          _id: cartID,
          "products.productID": productID,
        },
        {
          "products.$.quantity": quantity + existProductInCart.quantity,
        }
      );
    } else {
      const objCart = {
        productID: productID,
        quantity: quantity,
      };
      console.log(objCart);
      await Cart.updateOne(
        {
          _id: cartID,
        },
        {
          $push: { products: objCart },
        }
      );
    }

    req.flash("success", "Added product to carts successfully !");
    res.redirect("back");
  } catch (e) {
    console.log(e);
  }
};
