const AuthLayout = ({ children }) => {
  return <div className="flex justify-center pt-40 min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">{children}</div>;
};

export default AuthLayout;