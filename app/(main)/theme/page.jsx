"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Palette, Sparkles } from 'lucide-react';
import ThemeToggle from '@/components/theme-toggle';
import { useEffect, useState } from 'react';

export default function ThemePage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled on component mount
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

  useEffect(() => {
    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  return (
    <div className="space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black backdrop-blur-sm rounded-xl p-6 shadow-lg min-h-[80vh]">
      <div className="flex items-center gap-3 mb-8">
        <Palette className="h-8 w-8 text-blue-600 dark:text-purple-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Theme Settings</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Theme Toggle Card */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-white">
              {isDark ? <Moon className="h-5 w-5 text-blue-400" /> : <Sun className="h-5 w-5 text-orange-500" />}
              Theme Mode
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Switch between light and dark themes for better visual experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {isDark ? 
                    <Moon className="h-5 w-5 text-blue-400" /> : 
                    <Sun className="h-5 w-5 text-orange-500" />
                  }
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {isDark ? 'Dark Mode' : 'Light Mode'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isDark ? 'Dark gradients with vibrant accents' : 'Soft gradient theme - easy on the eyes'}
                  </p>
                </div>
              </div>
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
            </div>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-white">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Theme Preview
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              See how your theme looks with these sample elements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 dark:from-gray-700 dark:to-gray-600 text-white">
              <h3 className="font-semibold">Sample Card</h3>
              <p className="text-sm opacity-90">This is how cards will look in your chosen theme</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                Primary
              </Button>
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20">
                Secondary
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Theme Information */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-800 dark:text-white">Theme Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Light Mode Features:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Soft blue and indigo gradients</li>
                <li>• Reduced eye strain with gentle colors</li>
                <li>• Clean and professional appearance</li>
                <li>• Perfect for extended use</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Dark Mode Features:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Stylish dark gradients with depth</li>
                <li>• Reduced eye strain in low light</li>
                <li>• Vibrant accent colors for highlights</li>
                <li>• Professional and sleek design</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
