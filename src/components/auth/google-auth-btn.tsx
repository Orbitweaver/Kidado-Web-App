import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";
import { cn } from "@/lib/utils";
import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const GoogleAuthBtn = ({ disabled = false }: { disabled?: boolean }) => {
  const { mutate: loginWithGoogle, isPending } = useGoogleAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(400);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full",
        (disabled || isPending) && " pointer-events-none opacity-50",
      )}
    >
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (!credentialResponse.credential) {
            toast.error("Google login failed. Please try again.");
            return;
          }
          loginWithGoogle(credentialResponse.credential);
        }}
        onError={() => toast.error("Google login failed. Please try again.")}
        useOneTap={false}
        text="signin_with"
        logo_alignment="center"
        width={width}
        containerProps={{
          className:
            "w-full rounded-md text-sm font-medium border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        }}
      />
    </div>
  );
};

export default GoogleAuthBtn;
