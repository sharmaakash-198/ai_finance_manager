import React from "react";
import { Github, Globe, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-8 border-t border-slate-800/80">
      <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-sm text-center">
        <span>Engineered by</span>
        <a
          href="https://akash-sharma-dev.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all duration-300 hover:underline cursor-pointer"
        >
          Akash Sharma
        </a>
        <a
          href="https://github.com/sharmaakash-198"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="ml-1 text-slate-400 hover:text-purple-400 transition-colors duration-200 inline-flex items-center"
        >
          <Github className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
