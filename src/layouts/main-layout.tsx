import { Navigate, Outlet } from "react-router";
import useUserStore from "@/store/user-store";

const MainLayout = () => {
  const { accessToken } = useUserStore();

  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
