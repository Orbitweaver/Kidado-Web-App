import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";
import { cn } from "@/lib/utils";
import { GoogleLogin } from "@react-oauth/google";

const GoogleAuthBtn = ({ disabled = false }: { disabled?: boolean }) => {
  const { mutate: loginWithGoogle, isPending } = useGoogleAuth();

  return (
    <div
      className={cn(
        "w-full",
        (disabled || isPending) && " pointer-events-none opacity-50",
      )}
    >
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          loginWithGoogle(credentialResponse.credential!);
        }}
        onError={() => console.error("Google Login Failed")}
        useOneTap={false}
        text="signin_with"
        logo_alignment="center"
        containerProps={{
          className:
            "w-full rounded-md text-sm font-medium border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        }}
      />
    </div>
  );
};

export default GoogleAuthBtn;
