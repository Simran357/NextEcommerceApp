import "./globals.css";

export const metadata = {
  title: "ShopEase",
  description: "E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}