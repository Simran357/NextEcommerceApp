import ProductForm from "@/components/admin/productForm";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProduct({
  params,
}: Props) {
  const { id } = await params;

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (!data) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
          Inventory
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Edit Product
        </h1>

        <p className="mt-2 text-gray-500">
          Update product information.
        </p>
      </div>

      <ProductForm
        product={data}
      />
    </div>
  );
}