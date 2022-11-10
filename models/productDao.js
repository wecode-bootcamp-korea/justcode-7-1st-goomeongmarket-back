const myDataSource = require("./index");

//----------------------------------------------------------------

const getProducts = async () => {
  const result = await myDataSource.query(`
    SELECT 
    products.id,
    products.name as title,
    products.price,
    products.inventory_number,
    products.scale,
    products.country_id,
    products.sale,
    products.created_at,
    products.updated_at,
    T.image_url as img
    FROM products 
    INNER JOIN (select * from product_images order by created_at desc) AS T ON T.product_id=products.id`);

  return result;
};

const getProductsByCategory = async (category_id, sorterd_by) => {
  if (sorterd_by > 0) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id WHERE categories.name = "${category_id}" order by ${sorterd_by}`
    );
    return result;
  }
  if (sorterd_by < 0) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id WHERE categories.name = "${category_id}" order by ${
        sorterd_by * -1
      } desc`
    );
    return result;
  }
  if (!sorterd_by) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id WHERE categories.name = "${category_id}"`
    );
    return result;
  }
};
const productData = async (product_id) => {
  const result = await myDataSource.query(
    `select 
    products.id,
    products.name as title,
    products.sub_name,
    products.price,
    countries.name as country_id,
    products.created_at,
    T.image_url as img
    from products 
    JOIN countries ON countries.id = products.country_id
    INNER JOIN (select * from product_images order by created_at desc) AS T ON T.product_id=products.id
    where products.id = ${product_id}`
  );
  return result;
};

const orderProduct = async (user_id, product_id, ordered_number) => {
  const result = await myDataSource.query(
    `insert into ordered_products (user_id, product_id, ordered_number) values (${user_id},${product_id},${ordered_number}) `
  );
  return result;
};

const LineUpToCheap = async (category_id, sorted_by) => {
  if (sorted_by > 0 && !category_id) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id order by ${sorted_by}`
    );
    return result;
  }
  if (sorted_by > 0 && category_id.length > 0) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id where category_id = ${category_id} order by ${sorted_by}`
    );
    return result;
  }
  //sort<0, category x
  if (sorted_by < 0 && !category_id) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id order by ${
        sorted_by * -1
      } desc`
    );
    return result;
  }
  if (sorted_by < 0 && category_id.length > 0) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id where category_id = ${category_id} order by ${sorted_by}`
    );
    return result;
  }
  //sort x, category x
  if (!sorted_by && !category_id) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id order by 6`
    );
    return result;
  }
  if (!sorted_by && category_id.length > 0) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id where category_id = ${category_id} order by 6`
    );
    return result;
  }
};

const getReviewByProduct = async (product_id) => {
  const result = await myDataSource.query(`
    SELECT users.username, comments.comment, date_format(comments.updated_at, '%Y-%m-%d')
    FROM comments 
    INNER JOIN users ON comments.user_id = users.id 
    INNER JOIN products ON comments.product_id = products.id 
    WHERE product_id = ${product_id}
  `);
  return result;
};

const getNewProduct = async (category_id, sorted_by) => {
  //sort>0, category x

  if (sorted_by > 0 && !category_id) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id order by ${sorted_by}`
      //   `select
      //         JSON_ARRAYAGG(
      //             JSON_OBJECT(
      //                 "id", products.id,
      //                 "title", products.name,
      //                 "sub_name", products.sub_name,
      //                 "img", product_images.image_url,
      //                 "brand", brands.name,
      //                 "category", categories.name,
      //                 "price", products.price,
      //                 "inventory_number", products.inventory_number,
      //                 "scale", products.scale,
      //                 "country", countries.name,
      //                 "created_at", products.created_at,
      //                 "sum", OT.sum
      //             )
      //           )as products
      //     FROM products
      //     JOIN product_images ON products.id = product_images.product_id
      //     JOIN brands ON products.brand_id = brands.id
      //     JOIN categories ON products.category_id = categories.id
      //     JOIN countries ON products.country_id = countries.id
      //     JOIN (select product_id, sum(ordered_number) as sum from ordered_products group by product_id) as OT on products.id = OT.product_id
      //     WHERE categories.id = ${category_id} order by ${sorted_by}`
      // );
      // result = [...result].map((item) => {
      //   return { ...item, products: JSON.parse(item.products) };
      // });
    );
    return result;
  }
  if (sorted_by > 0 && category_id.length > 0) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id where category_id = ${category_id} order by ${sorted_by}`
    );
    return result;
  }
  //sort<0, category x
  if (sorted_by < 0 && !category_id) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id order by ${
        sorted_by * -1
      } desc`
    );
    return result;
  }
  if (sorted_by < 0 && category_id.length > 0) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id where category_id = ${category_id} order by ${sorted_by}`
    );
    return result;
  }
  //sort x, category x
  if (!sorted_by && !category_id) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id order by 11`
    );
    return result;
  }
  if (!sorted_by && category_id.length > 0) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id where category_id = ${category_id} order by 11`
    );
    return result;
  }
  // const result = await myDataSource.query(
  //   `select products.*, products.name as title, IT.image_url, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = ot.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id WHERE categories.id = ${category_id} order by ${sorted_by}`
  // );

  // return result;
};

const getBsetProduct = async (category_id, sorted_by) => {
  //sort>0, category x
  if (sorted_by > 0 && !category_id) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id order by ${sorted_by}`
    );
    return result;
  }
  if (sorted_by > 0 && category_id.length > 0) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id where category_id = ${category_id} order by ${sorted_by}`
    );
    return result;
  }
  //sort<0, category x
  if (sorted_by < 0 && !category_id) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id order by ${
        sorted_by * -1
      } desc`
    );
    return result;
  }
  if (sorted_by < 0 && category_id.length > 0) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id where category_id = ${category_id} order by ${sorted_by}`
    );
    return result;
  }
  //sort x, category x
  if (!sorted_by && !category_id) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id order by 16`
    );
    return result;
  }
  if (!sorted_by && category_id.length > 0) {
    const result = await myDataSource.query(
      `select products.*, products.name as title, IT.image_url as img, OT.* from products INNER JOIN categories ON products.category_id=categories.id left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = OT.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id where category_id = ${category_id} order by 16`
    );
    return result;
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  productData,
  LineUpToCheap,
  getReviewByProduct,
  orderProduct,
  getNewProduct,
  getBsetProduct,
};
