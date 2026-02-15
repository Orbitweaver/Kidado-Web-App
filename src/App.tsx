import { Route, Routes } from "react-router";
import LoginPage from "./pages/login-page";
import NotFoundPage from "./pages/not-found-page";
import RegisterPage from "./pages/register-page";
import OTPPage from "./pages/otp-page";
import OnboardingPage from "./pages/onboarding-page";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      <Route path="/" element={<h1 className="text-3xl text-center mt-24">Home page</h1>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
