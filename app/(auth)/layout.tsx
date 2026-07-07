export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
      {children}
    </main>
  );
}