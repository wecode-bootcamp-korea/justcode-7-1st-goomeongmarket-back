const myDataSource = require("./index");

const cartUpdate = async (product_name, user_id) => {
  // const product_id = await myDataSource.query(`
  //   SELECT id
  //   FROM products
  //   WHERE name = ${product_name}
  // `);
  const product_id = 1;
  await myDataSource.query(`
  INSERT INTO cart_item (user_id, product_id, put_quantity)
  VALUES (1, 1, 1)
  `);
};

const cartList = async (req, res) => {
  await myDataSource.query(`
  `);
};

module.exports = { cartUpdate, cartList };
