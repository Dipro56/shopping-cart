import { Box, Flex, Select, Text, Grid } from '@radix-ui/themes';
import ProductCard from '@/components/products/ProductCard';
import productService from '@/services/productService';

async function getProducts() {
  let res = await productService.getAllProduct();
  if (res?.products.length > 0) {
    return res?.products;
  } else {
    return { products: [] };
  }
}

const Home: React.FC = async () => {
  let productList = await getProducts();
  return (
    <Box mt="5" className="bg-slate-100 px-0 xl:px-24">
      <Grid
        className="gap-2"
        columns={{ xs: '2', sm: '3', md: '5' }}
        gap="4"
        mt="5"
        rows="auto"
        width="auto"
      >
        {productList?.length > 0 &&
          productList?.map((item: Product) => (
            <ProductCard key={item.id} product={item} />
          ))}
      </Grid>
    </Box>
  );
};

export default Home;
