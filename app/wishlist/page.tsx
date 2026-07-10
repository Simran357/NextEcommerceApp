import WishlistPage from "@/components/wishlist/wishlistPage";

export default async function Wishlist() {

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Administration
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Wishlists
        </h1>
z
        <p className="mt-2 text-slate-500">
          Products customers have saved.
        </p>
      </div>

      <WishlistPage />
    </div>
  );
}