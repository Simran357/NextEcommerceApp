import { getProductById } from "@/lib/products";
import ProductDetails from "@/components/products/productDetails";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: Props) {

  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  return (
    <ProductDetails
      product={product}
    />
  );
}