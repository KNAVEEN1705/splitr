"use client";

import { useStore } from '@/hook/use-store-user';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import { BarLoader } from "react-spinners";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { Authenticated, Unauthenticated } from 'convex/react';
import { Button } from './ui/button';
import { LayoutDashboard } from 'lucide-react';

const Header = () => {
  const { isLoading } = useStore();
  const path = usePathname()

  return (
    <header className='flex top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60'>
      <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <Link href="/">
          <Image
            src="/logos/splitrlogo.png" 
            alt="Logo"
            width={200}
            height={60}
            className="h-16 w-auto object-contain"
          />
        </Link>
        {path === "/" && (
            <div className='hidden md:flex items-center gap-4 '>
                <Link href="#feature"
                className='text-sm font-medium hover:text-green-700 transition'>
                    Features
                </Link>
                <Link href="#how-it-works"
                className='text-sm font-medium hover:text-green-700 transition'>
                    How It Works
                </Link>
            </div>
        )}
        <div className='flex items-center gap-4'>
            <Authenticated>
               
                <Link href="/dashboard">
                 <Button variant="outline"className="hidden md:inline-flex items-center gap-2 hover:text-green-700 hover:border-green-700 transition">
                     <LayoutDashboard className='h-4 w-4'/>
                    Dashboard
                 </Button>

                 <Button variant="ghost" className="md:hidden w-16 h-16 p-0">
                    <LayoutDashboard className='h-6 w-6'/>
                 </Button>

               
                </Link>
                <UserButton/>
            </Authenticated>
            <Unauthenticated>
                <SignInButton>
                    <Button variant={"ghost"}>Sign In</Button>
                </SignInButton>
                <SignUpButton>
                    <Button className="bg-green-700">Get Started</Button>
                </SignUpButton>
            </Unauthenticated>
        </div>
      </nav>

      {isLoading && <BarLoader width={"100%"} color='#36d7b7' />}
    </header>
  );
}

export default Header;
