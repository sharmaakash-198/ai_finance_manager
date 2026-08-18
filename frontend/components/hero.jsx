"use client";

// import { Link } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';

const HeroSection = () => {

    const imageRef = useRef();

    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;  
            const scrollthreshold = 100;
            if(scrollPosition > scrollthreshold) {
                imageElement.classList.add('scrolled');
            }else{
                imageElement.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll);
    }, [])


    return (<div className='pb-20 px-4'>
        <div className='container mx-auto text-center'>

            <h1 className='text-5xl md:text-7xl lg:text-[84px] font-black tracking-tight pb-4 text-slate-900 dark:text-white leading-[1.1]'>
                Manage Your{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Finances
                </span> <br />
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                    with Intelligence
                </span>
            </h1>
            <p className='text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed'>
                An intelligent finance management app that helps you track your expenses, analyze spending, set smart budgets, and achieve your financial goals seamlessly.
            </p>

            <Link href='/dashboard'>
                <Button size='lg' className='px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0'>Get Started</Button>
            </Link>

            {/* <Link href='/dashboard'>
                <Button size='lg' variant ='outline' className='px-8'>Watch Demo</Button>
                </Link> */}
            <div className='hero-image-wrapper'>
                <div ref={imageRef} className='hero-image'>
                    <video 
                        src='/banner.mp4' 
                        alt='Dashboard preview' 
                        width={1280} 
                        height={720} 
                        className='rounded-lg shadow-2xl border mx-auto' 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                    />
                </div>
            </div>
        </div>
    </div>
    );
}

export default HeroSection
