const findEmptyData = async (targetData) => {
  Object.keys(targetData).map((key) => {
    if (!targetData[key]) {
      const error = new Error(`KEY_ERROR: ${key}`);
      error.statusCode = 400;
      throw error;
    }
  });
};

module.exports = { findEmptyData };
