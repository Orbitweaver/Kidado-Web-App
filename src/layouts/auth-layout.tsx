import Logo from "@/components/svgs/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 p-8">
      <div className="bg-muted relative hidden lg:block">
        <div
          className={`px-4 flex flex-col items-center justify-around bg-[url('/images/auth-bg.png')] h-full w-full rounded-lg bg-no-repeat bg-cover text-white text-center`}
        >
          <div>
            <h1 className="text-3xl lg:text-4xl xl:text-[40px] font-bold">
              Welcome to Kidado
            </h1>
            <p className="mt-1 text-lg lg:text-xl xl:text-[22px] font-medium">
              Global Academic Network for Educators & Learners
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <div>
              <h2 className="text-2xl lg:text-3xl xl:text-[34px] font-bold">
                Share Knowledge. Find Mentors.
              </h2>
              <p className="mt-2 text-lg lg:text-xl xl:text-[22px] font-normal max-w-lg mx-auto">
                Showcase research, projects, and expertise find right guidance
                and collaboration opportunities.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-8">
              <span className="h-2 w-6 bg-white rounded-full cursor-pointer"></span>
              <span className="h-2 w-2 bg-gray-400 rounded-full cursor-pointer"></span>
              <span className="h-2 w-2 bg-gray-400 rounded-full cursor-pointer"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-1 items-center justify-center p-0 md:p-10">
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-center mb-12">
              <Logo />
            </div>
            {children}
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          By signing up to create an account I accept Company's <br />
          <a href="#" className="text-foreground">
            Terms of use
          </a>{" "}
          &{" "}
          <a href="#" className="text-foreground">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
