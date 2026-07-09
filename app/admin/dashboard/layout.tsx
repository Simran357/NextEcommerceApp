import ProtectedAdmin from "@/components/admin/protectedAdmin";
import AdminNavbar from "@/components/admin/adminNavbar";
import AdminSidebar from "@/components/admin/adminSidebar";
import Breadcrumbs from "@/components/admin/breadCrumbs";

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
            <Breadcrumbs />
            {children}
          </main>
        </div>
      </div>
    </ProtectedAdmin>
  );
}