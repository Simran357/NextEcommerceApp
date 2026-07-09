"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductCardProps } from "@/interfaces/product";
import Image from "next/image";
import {
  addProduct,
  updateProduct,
} from "@/lib/adminProducts";

export default function ProductForm({
  product,
}: ProductCardProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: product?.title ?? "",
    description: product?.description ?? "",
    category: product?.category ?? "",
    brand: product?.brand ?? "",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    discount_percentage:
      product?.discount_percentage ?? 0,
    rating: product?.rating ?? 0,
    thumbnail: product?.thumbnail ?? "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "stock" ||
        name === "discount_percentage" ||
        name === "rating"
          ? Number(value)
          : value,
    }));
  }

 async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  try {
    if (product) {
      await updateProduct(
        product.id,
        form
      );
    } else {
      await addProduct(form);
    }

    alert(
      product
        ? "Product Updated"
        : "Product Added"
    );

    router.push("/admin/products");

    router.refresh();
  } catch (error) {
    console.error(error);

    alert("Something went wrong.");
  }
}
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-10 shadow-sm border border-gray-200"
    >
      <div className="grid grid-cols-2 gap-6">

        <div className="col-span-2">
          <label className="mb-2 block font-semibold">
            Product Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Brand
          </label>

          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Rating
          </label>

          <input
            type="number"
            step="0.1"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Discount %
          </label>

          <input
            type="number"
            name="discount_percentage"
            value={form.discount_percentage}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="col-span-2">
          <label className="mb-2 block font-semibold">
            Thumbnail URL
          </label>

          <input
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        {form.thumbnail && (
          <div className="col-span-2">
            <label className="mb-2 block font-semibold">
              Preview
            </label>

            <Image
              src={form.thumbnail}
              alt="Preview"
              className="h-44 rounded-2xl border object-cover"
            />
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-end gap-4">

        <button
          type="button"
          onClick={() =>
            router.push("/admin/products")
          }
          className="rounded-xl border px-6 py-3"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {product ? "Update Product" : "Add Product"}
        </button>

      </div>
    </form>
  );
}