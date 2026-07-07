import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";

export default function Products() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto mt-8 flex gap-6 px-5">
        <Sidebar />

        <section className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Products</h1>
        </section>
      </main>
    </>
  );
}