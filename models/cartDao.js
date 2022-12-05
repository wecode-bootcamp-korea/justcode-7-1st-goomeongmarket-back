const myDataSource = require("./index");

const cartUpdate = async (product_id, put_quantity, user_id) => {
  let existProduct = await myDataSource.query(
    `
    SELECT 
      user_id, product_id 
    FROM
      cart_item 
    where
      user_id = ? && product_id = ?;
  `,
    [user_id, product_id]
  );
  if (existProduct) {
    await myDataSource.query(
      `
      INSERT INTO 
        cart_item (user_id, product_id, put_quantity)
      VALUES 
        (?, ?, ?)
    `,
      [user_id, product_id, put_quantity]
    );
  }
  if (!existProduct) {
    await myDataSource.query(
      `
      UPDATE 
        cart_item 
      SET
        put_quantity = ? 
      WHERE
        user_id = ? && product_id = ?
    `,
      [put_quantity, user_id, product_id]
    );
  }
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

const deleteItemInCart = async (product_id, user_id) => {
  await myDataSource.query(
    `
      DELETE FROM
        cart_item
      WHERE
        user_id = ? && product_id = ?
    `,
    [user_id, product_id]
  );
};

module.exports = { cartUpdate, cartList, deleteItemInCart };
