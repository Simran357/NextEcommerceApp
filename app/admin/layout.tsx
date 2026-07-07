import ProtectedAdmin from "@/components/admin/protectedAdmin";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/adminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedAdmin>
      <div className="flex min-h-screen bg-gray-100">

        <AdminSidebar />

        <div className="flex-1">

          <AdminNavbar />

          <main className="p-8">
            {children}
          </main>

        </div>

      </div>
    </ProtectedAdmin>
  );
}