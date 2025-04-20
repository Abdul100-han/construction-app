import VendorDashboard from '@/components/dashboard/VendorDashboard';
import { ProtectedRoute } from '@/components/ui/ProtectedRoute';

export default function VendorDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['vendor']}>
      <VendorDashboard />
    </ProtectedRoute>
  );
}