import ProductDetails from "@/components/shop/productDetails/ProductDetails";

export default async function Page({ params }) {
  const { id } = await params;

  return <ProductDetails id={id} />;
}