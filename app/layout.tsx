import "./globals.css";

export const metadata = {
  title: "ShopEase",
  description: "E-Commerce",
};
import { FilterProvider } from "@/components/context/filterContext";
import { AuthProvider } from "@/components/context/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
    <html lang="en">
      <body className="bg-gray-100">
       <AuthProvider>

    <FilterProvider>

        {children}

    </FilterProvider>

</AuthProvider>
      </body>
    </html>
  );
}