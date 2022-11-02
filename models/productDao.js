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

const getProducts = async (token) => {
  const result = await myDataSource.query(`select * from products`);
  return result;
};

const getProductsByCategory = async (category_id) => {
  const result = await myDataSource.query(
    `SELECT products.* FROM products INNER JOIN categories ON products.category_id=categories.id WHERE categories.name = "${category_id}"`
  );
  return result;
};

const productData = async (product_id) => {
  const result = await myDataSource.query(
    `select * from products where products.id = ${product_id}`
  );
  return result;
};

const LineUpToNew = async (token) => {
  const result = await myDataSource.query(
    `select * from products order by created_at desc`
  );
  return result;
};
module.exports = {
  getProducts,
  getProductsByCategory,
  productData,
  LineUpToNew,
};
