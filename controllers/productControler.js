import sequelize from "../db.js";

export const getProducts = async (req, res) => {
  const { page, pagesize, searchquery } = req.query;
  const { category, subcategory, minprice, maxprice } = req.body;

  try {
    const [result] = await sequelize.query(
      `select * from public.get_products_paginated_with_filters(:p_page_number,:p_page_size,:p_category_fk,:p_subcategory_fk,:p_search_query,:p_min_price,:p_max_price)`,
      {
        replacements: {
          p_page_number: page || null,
          p_page_size: pagesize || null,
          p_category_fk: category || null,
          p_subcategory_fk: subcategory || null,
          p_search_query: searchquery || null,
          p_min_price: minprice || null,
          p_max_price: maxprice || null,
        },
      }
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const [result] = await sequelize.query(
      `select * from public.get_all_categories()`
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getProductDetail = async (req, res) => {
  const { productid } = req?.query;
  try {
    const [result] = await sequelize.query(
      `select * from public.get_productdetail(:productid)`,
      {
        replacements: {
          productid: productid,
        },
      }
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
