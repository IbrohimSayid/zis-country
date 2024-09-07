import React, { useState, useEffect } from "react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <header className="flex justify-between items-center p-4 shadow-md mt-5 rounded-md w-full max-w-screen-xl mx-auto">
      <h1 className="text-xl font-bold">Qayerga Sayohat?</h1>
      <button
        className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 transition-colors"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? "Yorug' rejim" : "Qorong'i rejim"}
      </button>
    </header>
  );
};

export default Header;