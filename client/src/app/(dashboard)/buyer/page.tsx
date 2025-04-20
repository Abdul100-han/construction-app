import BuyerDashboard from '@/components/dashboard/BuyerDashboard';
import { ProtectedRoute } from '@/components/ui/ProtectedRoute';

export default function BuyerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['buyer']}>
      <BuyerDashboard />
    </ProtectedRoute>
  );
}