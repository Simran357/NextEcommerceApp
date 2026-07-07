import { getProductById } from "@/lib/products";
import Image from "next/image";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetails({
  params,
}: Props) {

  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  const finalPrice = (
    product.price -
    (product.price * product.discount_percentage) / 100
  ).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <div className="grid lg:grid-cols-2 gap-12">

        <div className="bg-white rounded-2xl shadow p-10">

          <div className="relative h-[500px]">

            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              priority
              sizes="50vw"
              className="object-contain"
            />

          </div>

        </div>

        <div>

          <p className="uppercase tracking-widest text-blue-600 font-semibold">
            {product.category}
          </p>

          <h1 className="text-5xl font-bold mt-2">
            {product.title}
          </h1>

          <p className="text-gray-600 mt-6 leading-8">
            {product.description}
          </p>

          <div className="mt-8 space-y-3">

            <div className="flex gap-3">
              <span className="font-semibold">
                Brand :
              </span>
              {product.brand}
            </div>

            <div className="flex gap-3">
              <span className="font-semibold">
                Rating :
              </span>
              ⭐ {product.rating}/5
            </div>

            <div className="flex gap-3">
              <span className="font-semibold">
                Availability :
              </span>

              <span
                className={
                  product.stock > 0
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                {product.stock} Left
              </span>

            </div>

          </div>

          <div className="flex items-center gap-5 mt-10">

            <h2 className="text-5xl font-bold text-blue-600">
              ₹ {finalPrice}
            </h2>

            <h3 className="text-2xl line-through text-gray-400">
              ₹ {product.price}
            </h3>

            <span className="bg-green-100 text-green-700 px-3 py-2 rounded-lg font-semibold">
              {product.discount_percentage}% OFF
            </span>

          </div>

          <div className="flex gap-5 mt-12">

            <button className="flex-1 bg-blue-600 text-white py-4 rounded-xl text-lg hover:bg-blue-700">
              Add To Cart
            </button>

            <button className="flex-1 border-2 border-blue-600 text-blue-600 py-4 rounded-xl hover:bg-blue-600 hover:text-white">
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}