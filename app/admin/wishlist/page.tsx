import WishlistTable from "@/components/admin/wishlistTable";
import { getAllWishlist } from "@/lib/adminWishlist";
export default async function WishlistPage() {
  const wishlist = await getAllWishlist();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Administration
        </p>
      </div>

      <WishlistTable wishlist={wishlist} />
    </div>
  );
}