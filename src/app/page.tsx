import { Box, Flex, Select, Text, Grid } from "@radix-ui/themes";
import apiServices from '../services/apiServices'
import ProductCard from "@/components/products/ProductCard";




async function getProducts() {
  let res = await apiServices.allProducts();
  // console.log('res', res.products)
  if (res?.products.length > 0) {
    return res;
  } else {
    return { products: [] }; // Return an object with an empty products array
  }
}

const Home: React.FC = async () => {
  let data = await getProducts();
  // console.log('data', data)
  return (
    <Box mt="5" className='bg-slate-100 px-0 xl:px-24'>


      <Grid className="gap-2" columns={{ xs: '2', sm: '3', md: '5' }} gap="4" mt="5" rows="auto" width="auto">
        {data?.products?.length > 0 && data.products.map((item: Product) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
