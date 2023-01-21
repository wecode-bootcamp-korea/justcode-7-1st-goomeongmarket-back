const myDataSource = require("./index");

const addLike = async (user_id, product_id) => {
  await myDataSource.query(
    `
    INSERT INTO 
      likes (user_id, product_id)
    VALUE 
      (?,?)
   `,
    [user_id, product_id]
  );
};

const likeInfo = async (user_id) => {
  let listInfo = await myDataSource.query(
    `
    SELECT 
      likes.user_id,
    JSON_ARRAYAGG(
            JSON_OBJECT(
              "id", products.id,
              "title", products.name,
              "price",products.price,
              "img", product_images.image_url,
              "put_quantity", cart_item.put_quantity
            )
          )as products
    FROM 
      likes
    JOIN 
      products 
    ON
      likes.product_id = products.id
    JOIN
      product_images
    ON
      likes.product_id = product_images.product_id
    JOIN
      cart_item
    ON likes.product_id = cart_item.product_id
    WHERE
      likes.user_id = ?
    GROUP BY
      likes.user_id
  `,
    [user_id]
  );

  return listInfo;
};

const removelike = async (user_id, product_id) => {
  await myDataSource.query(
    `
  DELETE FROM 
    likes
  WHERE 
    user_id = ? && product_id = ?
  `,
    [user_id, product_id]
  );
};

module.exports = { addLike, likeInfo, removelike };
