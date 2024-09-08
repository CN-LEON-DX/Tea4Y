module.exports = (req) => {
  const { priceRange, status, search } = req.query;
  let query = {
    deleted: false,
  };

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    query.price = maxPrice
      ? { $gte: minPrice, $lte: maxPrice }
      : { $gte: minPrice };
  }

  if (status) {
    query.status = status;
  }

  if (search) {
    query.title = { $regex: new RegExp(search, "i") };
  }

  return query;
};
