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
            <h1 className='text-5xl md:text-8xl lg:text-[80px] font-extrabold tracking-tighter pr-2 pb-2 text-gray-800 dark:text-white drop-shadow-lg'>
                Manage Your Finances <br /> with Intelligence
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto'>
                An intelligent finance management app that helps you track your expenses, analyze, set budgets, and achieve your financial goals.
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
