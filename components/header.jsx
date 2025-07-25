import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { LayoutDashboard, PenBox } from 'lucide-react';
import { checkUser } from '@/lib/checkUser';
import ThemeToggle from './theme-toggle';

const Header = async() => {

await checkUser();

    return (
        <div className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
            <nav className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/">
                    <Image
                        src={"/logo-new.png"}
                        alt="Logo"
                        width={260} height={80}
                        className="h-20 w-auto object-contain"
                    />
                </Link>

                <div className='flex items-center space-x-4'>
                    {/* Theme toggle - visible for all users */}
                    <ThemeToggle />
                    
                    <SignedIn>
                        <div className='flex items-center space-x-3'>
                            <Link href="/dashboard" className='text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-purple-400'>
                                <Button variant="outline"
                                className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20"
                                >
                                    <LayoutDashboard size={18} />
                                    <span className='hidden md:inline ml-2'>Dashboard</span>
                                </Button>   
                            </Link>

                            <Link href="/transaction/create">
                                <Button className='flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0'>
                                    <PenBox size={18} />
                                    <span className='hidden md:inline'>Add Transaction</span>
                                </Button>
                            </Link>
                        </div>
                        
                        <div className='ml-4'>
                            <UserButton appearance={{
                                elements: {avatarBox: 'h-10 w-10'}
                            }}/>
                        </div>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton forceRedirectUrl='/dashboard'>
                            <Button variant="outline">Login</Button>
                        </SignInButton>
                    </SignedOut>

                </div>
            </nav>
        </div>
    )
};

export default Header;
