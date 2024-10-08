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
    if (cart.products){
      cart.totalQuantity = cart.products.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);
    }else {
      cart.totalQuantity = 0;
    }
    

    res.locals.miniCart = cart;
  }
  next();
};
