import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedAdminRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24">
        <LoadingSpinner label="Checking admin session" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (roles?.length && !roles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">Access restricted</h1>
          <p className="mt-3 text-sm font-semibold text-slate-500">Your admin role does not include this permission.</p>
        </div>
      </div>
    );
  }

  return children;
}
