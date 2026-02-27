import { Navigate, Outlet, useLocation } from "react-router";
import useUserStore from "@/store/user-store";
import { toast } from "sonner";

const MainLayout = () => {
  const { accessToken, user } = useUserStore();

  const location = useLocation();

  if (!accessToken || !user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!user?.is_active) {
    toast.error("Your account is not active");
    return <Navigate to="/sign-up" replace />;
  }

  if (!user?.profile?.name && location.pathname !== "/profile/setup") {
    return <Navigate to="/profile/setup" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
