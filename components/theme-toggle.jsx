"use client";

import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check current theme on mount
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Apply saved theme on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button 
        variant="outline" 
        size="default" 
        className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
      >
        <Sun size={20} />
        <span className='hidden lg:inline ml-2'>Theme</span>
      </Button>
    );
  }

  return (
    <Button 
      onClick={toggleTheme}
      variant="outline" 
      size="default" 
      className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
      <span className='hidden lg:inline ml-2'>
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </Button>
  );
}
