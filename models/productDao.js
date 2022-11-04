const { DataSource } = require("typeorm");
//const { validateToken } = require("./middleware/validateToken.js");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});
myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});
//----------------------------------------------------------------

const getProducts = async () => {
  const result = await myDataSource.query(
    `select products.*, T.image_url from products INNER JOIN (select * from product_images order by created_at desc limit 1) AS T ON T.product_id=products.id`
  );
  return result;
};

const getProductsByCategory = async (category_id) => {
  const result = await myDataSource.query(
    `SELECT products.* , product_images.image_url FROM products INNER JOIN categories ON products.category_id=categories.id INNER JOIN product_images ON product_images.product_id=products.id WHERE categories.name = "${category_id}"`
  );
  return result;
};

const productData = async (product_id) => {
  const result = await myDataSource.query(
    `select * from products where products.id = ${product_id}`
  );
  return result;
};

const LineUpToNew = async () => {
  const result = await myDataSource.query(
    `select products.*, T.image_url from products INNER JOIN (select * from product_images order by created_at desc limit 1) AS T ON T.product_id=products.id order by created_at desc`
  );
  return result;
};

const getReviewByProduct = async (product_id) => {
  const result = await myDataSource.query(
    `select users.name as user_name, products.name as product_name, comments.comment, comments.updated_at from comments INNER JOIN users ON comments.user_id=users.id INNER JOIN products ON comments.product_id=products.id where product_id = ${product_id}`
  );
  return result;
};
module.exports = {
  getProducts,
  getProductsByCategory,
  productData,
  LineUpToNew,
  getReviewByProduct,
};
