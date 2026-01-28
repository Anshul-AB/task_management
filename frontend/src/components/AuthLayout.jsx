const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      
      {/* Left Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src="/auth-illustration.png"
          alt="Task Illustration"
        />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          {children}
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
