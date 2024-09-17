const Cart = require("../../models/cart.model");

module.exports.cartID = async (req, res, next) => {
  const cartCookieID = req.cookies.cartID;

  if (!cartCookieID) {
    const cart = new Cart();
    await cart.save();

    const expiresTime = 1000 * 60 * 60 * 24 * 365; // 1 year

    res.cookie("cartID", cart.id, {
      expires: new Date(Date.now() + expiresTime),
    });
  } else {
    const cart = await Cart.findOne({ _id: cartCookieID });

    // Get total quantity of products inside the cart
    cart.totalQuantity = cart.products.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    // Set the miniCart data
    res.locals.miniCart = cart;

  }
  next();
};
