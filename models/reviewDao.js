const myReviewList = async (user_id) => {
  const result = await myDataSource.query(
    `select products.name as product_name, comment, comments.updated_at from comments inner join users on users.id = user_id inner join products on products.id = product_id where user_id = ${user_id}`
  );
  return result;
};
module.exports = {
  myReviewList,
};
