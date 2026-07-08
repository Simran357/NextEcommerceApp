import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">
        <div className="mb-6 text-7xl">🎉</div>

        <h1 className="text-4xl font-bold">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for shopping with us.
          Your order has been confirmed and
          will be delivered soon.
        </p>

        <div className="mt-8 space-y-4">
          <Link
            href="/products"
            className="block rounded-2xl bg-black py-4 text-center font-semibold text-white transition hover:opacity-90"
          >
            Continue Shopping
          </Link>

          <Link
            href="/cart"
            className="block rounded-2xl border py-4 text-center font-semibold transition hover:bg-gray-100"
          >
            View Cart
          </Link>
        </div>
      </div>
    </main>
  );
}