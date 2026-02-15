import { Route, Routes } from "react-router";
import LoginPage from "./pages/login-page";
import NotFoundPage from "./pages/not-found-page";
import RegisterPage from "./pages/register-page";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
