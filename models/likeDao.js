const myDataSource = require("./index");

const addLike = async (user_id, product_id) => {
  await myDataSource.query(`
    INSERT INTO likes (user_id, product_id)
    VALUES ("${user_id}", "${product_id}")
  `);
};

const likeInfo = async (user_id) => {
  let listInfo = await myDataSource.query(`
    SELECT likes.user_id,
    JSON_ARRAYAGG(
            JSON_OBJECT(
              "product_id", products.id,
              "product_name", products.name,
              "product_price",products.price,
              "product_img", products.product_img
            )
          )as products
    FROM likes
    JOIN products ON likes.product_id = products.id
    WHERE likes.user_id = ${user_id}
    GROUP BY likes.user_id
  `);

  // listInfo = [...listInfo].map((item) => {
  //   return { ...item, products: JSON.parse(item.products) };
  // });

  return listInfo;
};

const removelike = async (user_id, product_id) => {
  await myDataSource.query(`
  DELETE FROM likes
  WHERE user_id = ${user_id} && product_id = ${product_id}
  `);
};

module.exports = { addLike, likeInfo, removelike };
