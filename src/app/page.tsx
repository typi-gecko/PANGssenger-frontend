"use client"

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const loginPageMove = () => {
        router.push("/signin")
    };

    return (
        <div className="flex flex-col justify-center items-center h-[95%] animate-fade-in">
            <span className="font-pretendard font-semibold text-5xl lg:text-7xl">
                PANGssenger
            </span>
            <span className="font-pretendard font-semibold text-5xl lg:text-7xl">
                메신저 서비스
            </span>
            <Button
                variant="contained"
                sx={{ width: { xs: "50vw", md: "20vw" }, height: { xs: "7vh", md: "10vh" }, mt: "10%"}}
                onClick={loginPageMove}
            >
                START
            </Button>
        </div>
    )
}