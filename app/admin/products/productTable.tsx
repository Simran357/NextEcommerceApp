"use client";

import Link from "next/link";
import type { Product } from "@/interfaces/product";

export default function ProductTable({
    products,
}: {
    products: Product[];
}) {
    return (
        <table className="w-full bg-white rounded-xl overflow-hidden shadow">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-4">
                        Title
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Stock
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr
                        key={product.id}
                        className="border-b">
                        <td className="p-4">
                            {product.title}
                        </td>
                        <td>
                            ₹{product.price}
                        </td>
                        <td>
                            {product.stock}
                        </td>
                        <td className="space-x-3">
                            <Link
                                href={`/admin/products/edit/${product.id}`}
                                className="text-blue-600"
                            >
                                Edit
                            </Link>

                            <button className="text-red-600">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}