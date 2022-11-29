const myDataSource = require("./index");

const cartUpdate = async (product_id, put_quantity, user_id) => {
  await myDataSource.query(
    `
    INSERT INTO 
      cart_item (user_id, product_id, put_quantity)
    VALUES 
      (?, ?, ?)
  `,
    [user_id, product_id, put_quantity]
  );
};

const cartList = async (user_id) => {
  let listInfo = await myDataSource.query(
    `
      SELECT
      cart_item.user_id,
      JSON_ARRAYAGG(
          JSON_OBJECT(
            "id", products.id,
            "title", products.name,
            "price", products.price,
            "img", product_images.image_url,
            "put_quantity", cart_item.put_quantity
          )
          )as products
      FROM cart_item
      JOIN products ON cart_item.product_id = products.id
      JOIN product_images ON cart_item.product_id = product_images.product_id
      WHERE cart_item.user_id = ?
      GROUP BY cart_item.user_id
    `,
    [user_id]
  );

  return listInfo;
};

module.exports = { cartUpdate, cartList };
