
import { useAdminStatus } from "@/hooks/useAdminStatus";

const AdminBanner = () => {
  const { isAdmin } = useAdminStatus();

  if (!isAdmin) return null;
  
  return (
    <div className="bg-yellow-100 text-yellow-800 px-4 py-3 text-center">
      <p className="font-medium">Admin Mode - Developer Documentation Portal</p>
      <p className="text-sm">You're viewing the documentation in admin mode. This documentation is available to all users.</p>
    </div>
  );
};

export default AdminBanner;
