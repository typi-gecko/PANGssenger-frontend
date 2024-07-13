"use client"

import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const prevScrollY = useRef(0);
    const lastScrollTime = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const currentScrollTime = Date.now();
            const timeDiff = currentScrollTime - lastScrollTime.current;

            const scrollSpeed = Math.abs(currentScrollY - prevScrollY.current) / timeDiff;

            const isScrollingUp = prevScrollY.current > currentScrollY;
            const shouldShowHeader = isScrollingUp || currentScrollY < 10;

            const thresholdSpeed = 0.25;

            if (scrollSpeed > thresholdSpeed && shouldShowHeader !== isVisible) {
                setIsVisible(shouldShowHeader);
            }

            prevScrollY.current = currentScrollY;
            lastScrollTime.current = currentScrollTime;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    return (
        <div className="bg-stone-900 w-full" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            transition: 'transform 0.2s ease-out',
            transform: `translateY(${isVisible ? '0' : '-100%'})`,
        }}>
            <div className="px-[2%] py-4">
                <Link href="/" className="flex flex-row items-center">
                    <div className="w-10">
                        <Image
                            src="static\PMSG.svg"
                            alt="PMSG"
                            layout="responsive"
                            width={100}
                            height={100}
                        />
                    </div>
                    <span className="text-3xl font-pretendard font-extrabold text-neutral-50 px-2">PMSG</span>
                </Link>
            </div>
        </div>
    )
}

export default Header;