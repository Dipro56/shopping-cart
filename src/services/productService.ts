import { getCookie } from 'typescript-cookie';

interface ProductService {
  singleProductDetails: (id:String) => Promise<any>;
}

const productService: ProductService = {
  singleProductDetails: async (id:String) => {
    try {
      let url = `${process.env.BASE_API}/products/${id}`;
      console.log(url);
      let response = await fetch(url)
        .then((response) => response.json())
        .catch((error) => error);
      return response;
    } catch (error) {
      console.error('Error fetching registered players:', error);
      throw error;
    }
  },
};

export default productService;
