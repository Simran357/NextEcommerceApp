import Image from "next/image";
import type { ProductGridProps } from "@/interfaces/product";

export default function ProductTable({
    products,
}: ProductGridProps) {

    return (

        <div className="bg-white rounded-3xl shadow border">

            <div className="flex justify-between items-center p-6 border-b">

                <h2 className="text-2xl font-bold">

                    Products

                </h2>

                <button
                    className="bg-blue-600 text-white px-5 py-3 rounded-xl"
                >
                    + Add Product
                </button>

            </div>

            <table className="w-full">

                <thead className="bg-gray-50">

                    <tr>

                        <th className="p-4 text-left">
                            Product
                        </th>

                        <th>
                            Category
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

                    {products.map(product => (

                        <tr
                            key={product.id}
                            className="border-t hover:bg-gray-50"
                        >

                            <td className="p-4">

                                <div className="flex items-center gap-4">

                                    <Image
                                        src={product.thumbnail}
                                        alt={product.title}
                                        width={55}
                                        height={55}
                                        className="rounded-xl"
                                    />

                                    <div>

                                        <h3 className="font-semibold">
                                            {product.title}
                                        </h3>

                                        <p className="text-gray-500 text-sm">
                                            {product.brand}
                                        </p>

                                    </div>

                                </div>

                            </td>

                            <td>
                                {product.category}
                            </td>

                            <td>
                                ₹{product.price}
                            </td>

                            <td>

                                {product.stock}

                            </td>

                            <td>

                                <div className="flex gap-3">

                                    <button
                                        className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="px-4 py-2 rounded-lg bg-red-100 text-red-700"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}