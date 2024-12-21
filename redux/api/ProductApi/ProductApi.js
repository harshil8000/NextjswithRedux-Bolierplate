import axios from "../axios";

const ProductApi = {
  getProductApi: async (
    page = 1,
    category,
    categorys,
    limit = 12,
    search = "",
    inStock = '',
    tags = '',
  ) => {
    let endpoint = `/api/product/views?page=${page}&limit=${limit}&search=${search}&tags=${tags}&inStock=${inStock}`;

    if (category) {
      endpoint += `&category=${category}`;
    }

    if (categorys) {
      endpoint += `&category=${categorys}`;
    }

    const response = await axios.get(endpoint);
    return response.data;
  },
};

export default ProductApi;
