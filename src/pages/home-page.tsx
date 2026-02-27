import { Button } from "@/components/ui/button";
import useUserStore from "@/store/user-store";

const HomePage = () => {
  const { clearUser } = useUserStore();

  return (
    <div>
      <h1 className="text-3xl text-center mt-24">Home page</h1>
      <Button onClick={() => clearUser()} className="mx-auto block mt-4">
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
