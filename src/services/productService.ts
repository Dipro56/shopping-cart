import { getCookie } from 'typescript-cookie';

interface ProductService {
  getAllProduct: () => Promise<any>;
  singleProductDetails: (id: String) => Promise<Product>;
}

const productService: ProductService = {
  getAllProduct: async () => {
    try {
      let url = `${process.env.BASE_API}/products?limit=200`;
  
      let response = await fetch(url)
        .then((response) => response.json())
        .catch((error) => error);
      return response;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  },

  singleProductDetails: async (id: String) => {
    try {
      let url = `${process.env.BASE_API}/products/${id}`;
      console.log(url);
      let response = await fetch(url)
        .then((response) => response.json())
        .catch((error) => error);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
};

export default productService;
