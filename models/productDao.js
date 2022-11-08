const { myDataSource } = require("./index.js");

//----------------------------------------------------------------

const getProducts = async () => {
  const result = await myDataSource.query(
    `select products.*, T.image_url from products INNER JOIN (select * from product_images order by created_at desc limit 1) AS T ON T.product_id=products.id`
  );
  return result;
};

const getProductsByCategory = async (category_id, sorted_type) => {
  if (sorted_type > 0) {
    const result = await myDataSource.query(
      `select products.*, IT.image_url, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = ot.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id WHERE categories.name = "${category_id}" order by ${sorted_type}`
    );
    return result;
  }
  if (sorted_type < 0) {
    const result = await myDataSource.query(
      `select products.*, IT.image_url, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = ot.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id WHERE categories.name = "${category_id}" order by ${
        sorted_type * -1
      } desc`
    );
    return result;
  }
  if (!sorted_type) {
    const result = await myDataSource.query(
      `select products.*, IT.image_url, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = ot.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id WHERE categories.name = "${category_id}"`
    );
    return result;
  }
};
const productData = async (product_id) => {
  const result = await myDataSource.query(
    `select * from products where products.id = ${product_id}`
  );
  return result;
};

const oderProduct = async (user_id, product_id, ordered_number) => {
  const result = await myDataSource.query(
    `insert into ordered_products (user_id, product_id, ordered_number) values (${user_id},${product_id},${ordered_number}) `
  );
  return result;
};

const getReviewByProduct = async (product_id) => {
  const result = await myDataSource.query(
    `select users.name as user_name, products.name as product_name, comments.comment, comments.updated_at from comments INNER JOIN users ON comments.user_id=users.id INNER JOIN products ON comments.product_id=products.id where product_id = ${product_id}`
  );
  return result;
};

const getNewProduct = async (category_id, sorted_type) => {
  const result = await myDataSource.query(
    `select products.*, IT.image_url, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = ot.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id WHERE categories.id = "${category_id}" order by ${sorted_type}`
  );
  return result;
};

module.exports = {
  getProducts,
  getProductsByCategory,
  productData,
  oderProduct,
  getReviewByProduct,
  getNewProduct,
};
