import "./globals.css";

export const metadata = {
  title: "ShopEase",
  description: "E-Commerce",
};
import { FilterProvider } from "@/components/context/filterContext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
    <html lang="en">
      <body className="bg-gray-100">
        <FilterProvider>
          {children}
        </FilterProvider>
      </body>
    </html>
  );
}