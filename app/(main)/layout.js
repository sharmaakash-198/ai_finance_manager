import React from "react";

const MainLayout = ({ children }) => {
  return <div className="container mx-auto my-32 min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900 rounded-lg p-6">{children}</div>;
};

export default MainLayout;