"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type {
  Product,
  ProductDetailsModalProps,
} from "@/interfaces/product";
import {
  getProduct,
  updateProduct,
} from "@/lib/adminProducts";



export default function ProductDetailsModal({
  open,
  productId,
  onClose,
}: ProductDetailsModalProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [form, setForm] =
    useState<Partial<Product>>({
      title: "",
      description: "",
      category: "",
      brand: "",
      price: 0,
      stock: 0,
      rating: 0,
      discount_percentage: 0,
      thumbnail: "",
    });
useEffect(() => {
  if (!open || productId === null) return;

  const id = productId;

  async function loadProduct() {
    setLoading(true);

    try {
      const data = await getProduct(id);

      setForm(data);
    } catch {
      alert("Unable to load product.");
    } finally {
      setLoading(false);
    }
  }

  loadProduct();
}, [open, productId]);

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
        name === "rating" ||
        name === "discount_percentage"
          ? Number(value)
          : value,
    }));
  }

  async function handleSave() {
    if (!productId) return;

    setSaving(true);

    try {
      await updateProduct(productId, form);

      router.refresh();

      onClose();
    } catch {
      alert("Unable to update product.");
    }

    setSaving(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">

      <div className="h-screen w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Product Details
            </p>

            <h2 className="mt-1 text-3xl font-bold">
              Edit Product
            </h2>

          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500"
          >
            ×
          </button>

        </div>

        {loading ? (

          <div className="p-10 text-center">
            Loading...
          </div>

        ) : (

          <div className="space-y-6 p-8">

            {form.thumbnail && (
              <Image
                src={form.thumbnail}
                alt="Preview"
                width={600}
                height={350}
                className="h-64 w-full rounded-3xl object-cover"
              />
            )}

            <div>
              <label className="mb-2 block font-semibold">
                Product Title
              </label>

              <input
                name="title"
                value={form.title ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Description
              </label>

              <textarea
                rows={5}
                name="description"
                value={form.description ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">

              <div>

                <label className="mb-2 block font-semibold">
                  Category
                </label>

                <input
                  name="category"
                  value={form.category ?? ""}
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
                  value={form.brand ?? ""}
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
                  value={form.price ?? 0}
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
                  value={form.stock ?? 0}
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
                  value={form.rating ?? 0}
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
                  value={
                    form.discount_percentage ?? 0
                  }
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Thumbnail URL
              </label>

              <input
                name="thumbnail"
                value={form.thumbnail ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
              />

            </div>

            <div className="flex justify-end gap-4 pt-6">

              <button
                onClick={onClose}
                className="rounded-xl border px-6 py-3"
              >
                Cancel
              </button>

              <button
                disabled={saving}
                onClick={handleSave}
                className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}