const myDataSource = require("./index");

const cartUpdate = async (product_name, user_id) => {
  const [product] = await myDataSource.query(`
    SELECT id
    FROM products
    WHERE name = "${product_name}"
  `);
  console.log(product_id.id);
  const put_quantity = 1;
  await myDataSource.query(`
  INSERT INTO cart_item (user_id, product_id, put_quantity)
  VALUES (${user_id}, ${product.id}, ${put_quantity})
  `);
};

const cartList = async (user_id) => {
  let listInfo = await myDataSource.query(`
    SELECT
    cart_item.user_id,
    JSON_ARRAYAGG(
            JSON_OBJECT(
              "product_id", products.id,
              "product_name", products.name,
              "put_quantity", cart_item.put_quantity
            )
          )as products
    FROM cart_item
    JOIN products ON cart_item.product_id = products.id
    WHERE cart_item.user_id = ${user_id}
    GROUP BY cart_item.user_id
  `);

  listInfo = [...listInfo].map((item) => {
    return { ...item, products: JSON.parse(item.products) };
  });

  return listInfo;
};

module.exports = { cartUpdate, cartList };
