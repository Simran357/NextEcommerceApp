import "./globals.css";

export const metadata = {
  title: "ShopEase",
  description: "E-Commerce",
};
import { FilterProvider } from "@/components/context/filterContext";
import { AuthProvider } from "@/components/context/authContext";
import { WishlistProvider } from "@/components/context/wishlistContext";
import { CartProvider } from "@/components/context/cartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
    <html lang="en">
      <body className="bg-gray-100">
       <AuthProvider>
  <WishlistProvider>
     <CartProvider>
    <FilterProvider>

        {children}

    </FilterProvider>
    </CartProvider>
</WishlistProvider>
</AuthProvider>
      </body>
    </html>
  );
}