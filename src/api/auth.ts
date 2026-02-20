export const googleLogin = async (token: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    },
  );

  if (!res.ok) throw new Error("Google login failed");
  return res.json();
};
