import { Navigate } from "react-router";
import { useAuthStore } from "@/features/auth/store/authStore";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {
  const token = useAuthStore(
    (state) => state.token
  );

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}