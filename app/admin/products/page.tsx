import ProductTable from "@/components/admin/productTable";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Products
        </h1>

        <p className="mt-2 text-gray-500">
          View, edit and manage all products in your store.
        </p>
      </div>

      {/* Table */}
      <ProductTable
        products={products}
      />
    </div>
  );
}