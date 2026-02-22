import { useLocation, useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LoginForm } from "./login-form";
import RegisterForm from "./register-form";

const AuthTabs = () => {
  const navigate = useNavigate();
  const currentRoute = useLocation();

  const handleTabChange = (path: string) => {
    if (path === currentRoute.pathname) return;

    navigate(path);
  };

  return (
    <Tabs
      defaultValue={
        currentRoute.pathname.includes("/sign-in") ? "sign-in" : "sign-up"
      }
      className="w-full"
    >
      <TabsList className="w-full mb-6 bg-accent/60 text-[16px] font-medium">
        <TabsTrigger
          value="sign-up"
          className="data-[state=active]:bg-primary data-[state=active]:text-white text-[16px]font-medium"
          onClick={() => handleTabChange("/sign-up")}
        >
          Sign Up
        </TabsTrigger>
        <TabsTrigger
          value="sign-in"
          className="data-[state=active]:bg-primary data-[state=active]:text-white text-[16px]font-medium"
          onClick={() => handleTabChange("/sign-in")}
        >
          Sign In
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sign-up">
        <RegisterForm />
      </TabsContent>
      <TabsContent value="sign-in">
        <LoginForm />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
