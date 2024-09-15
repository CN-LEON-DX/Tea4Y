module.exports.productsDisplay = (products) => {
    return products.map((product) => {
        product.newPrice = (
        product.price *
        (1.0 - product.discountPercentage / 100)
        ).toFixed(2);
    
        return product;
    });
};