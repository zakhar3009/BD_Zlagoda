export const categoriesTableMap = new Map([
  ["GET_ALL_CATEGORIES", ["number", "name"]],
  ["GET_ALL_CATEGORIES_ORDER_BY_NAME", ["number", "name"]],
]);

export const categoriesCommandMap = new Map([
  ["GET_ALL_CATEGORIES", "Get all categories"],
  ["GET_ALL_CATEGORIES_ORDER_BY_NAME", "Get all categories order by name"],
  ["POST_ADD_CATEGORY", "Add new category"],
  ["POST_UPDATE_CATEGORY", "Update category"],
  ["DELETE_CATEGORY", "Delete category"],
]);
