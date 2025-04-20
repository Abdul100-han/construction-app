import RiderDashboard from '@/components/dashboard/RiderDashboard';
import { ProtectedRoute } from '@/components/ui/ProtectedRoute';

export default function RiderDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['rider']}>
      <RiderDashboard />
    </ProtectedRoute>
  );
}