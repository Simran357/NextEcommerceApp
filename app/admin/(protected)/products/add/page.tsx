"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaCloudUploadAlt,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";
import { addProduct } from "@/lib/adminProducts";
export default function AddProductPage() {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    category: "",
    description: "",
    thumbnail: "",
    price: "",
    stock: "",
    rating: "",
    discount_percentage: "",
  });

function handleChange(
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
}

async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  try {
    console.log({
  title: form.title,
  description: form.description,
  category: form.category,
  brand: form.brand,
  thumbnail: form.thumbnail,
  price: Number(form.price),
  stock: Number(form.stock),
  rating: Number(form.rating),
  discount_percentage: Number(form.discount_percentage),
});
    await addProduct({
      title: form.title,
      description: form.description,
      category: form.category,
      brand: form.brand,
      thumbnail: form.thumbnail,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
      discount_percentage: Number(form.discount_percentage),
    });

    alert("Product Added Successfully");

    setForm({
      title: "",
      brand: "",
      category: "",
      description: "",
      thumbnail: "",
      price: "",
      stock: "",
      rating: "",
      discount_percentage: "",
    });

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
}

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Add Product
          </h1>

          <p className="mt-2 text-gray-500">
            Create a new product for your store.
          </p>
        </div>

        <Link
          href="/admin/products"
          className="flex items-center gap-2 rounded-xl border px-5 py-3 transition hover:bg-gray-100"
        >
          <FaArrowLeft />
          Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 lg:grid-cols-3"
      >
        {/* Left */}

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-3xl bg-white p-8 shadow">
            <h2 className="mb-6 text-2xl font-bold">
              Product Information
            </h2>

            <div className="space-y-5">
              <input
                name="title"
                placeholder="Product Name"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border p-4"
              />

              <textarea
                rows={6}
                name="description"
                placeholder="Product Description"
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-xl border p-4"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <input
                  name="brand"
                  placeholder="Brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="rounded-xl border p-4"
                />

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="rounded-xl border p-4"
                >
                  <option value="">
                    Select Category
                  </option>

                  <option>
                    Beauty
                  </option>

                  <option>
                    Fragrances
                  </option>

                  <option>
                    Furniture
                  </option>

                  <option>
                    Groceries
                  </option>

                  <option>
                    Electronics
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow">
            <h2 className="mb-6 text-2xl font-bold">
              Pricing
            </h2>

            <div className="grid gap-5 md:grid-cols-3">
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="rounded-xl border p-4"
              />

              <input
                name="stock"
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="rounded-xl border p-4"
              />

              <input
                name="rating"
                type="number"
                step="0.1"
                placeholder="Rating"
                value={form.rating}
                onChange={handleChange}
                className="rounded-xl border p-4"
              />
            </div>

            <input
              name="discount_percentage"
              type="number"
              placeholder="Discount %"
              value={form.discount_percentage}
              onChange={handleChange}
              className="mt-5 w-full rounded-xl border p-4"
            />
          </div>
        </div>

        {/* Right */}

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow">
            <h2 className="mb-6 text-xl font-bold">
              Product Image
            </h2>

            <div className="rounded-2xl border-2 border-dashed border-gray-300 p-10 text-center transition hover:border-blue-500">
              <FaCloudUploadAlt
                size={55}
                className="mx-auto text-blue-600"
              />

              <p className="mt-4 font-semibold">
                Upload Product Image
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Drag & Drop or paste image URL.
              </p>
            </div>

            <input
              name="thumbnail"
              placeholder="Image URL"
              value={form.thumbnail}
              onChange={handleChange}
              className="mt-6 w-full rounded-xl border p-4"
            />
          </div>

          <div className="rounded-3xl bg-white p-8 shadow">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              <FaSave />

              Save Product
            </button>

            <Link
              href="/admin/products"
              className="mt-4 block rounded-xl border py-4 text-center font-medium transition hover:bg-gray-100"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}