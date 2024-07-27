interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  reviews: Review[];
  stock: number;
  brand: string;
  availabilityStatus: string;
  thumbnail: string;
  sku: string;
  tags: string[];
  minimumOrderQuantity: number;
  quantity: number;
  shippingInformation: string;
  returnPolicy: string;
}
