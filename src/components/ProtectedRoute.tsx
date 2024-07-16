"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    let condition: boolean;

    sessionStorage.getItem('user-id') ? (condition = true) : (condition = false)
    const redirectTo = '/signin';

    useEffect(() => {
        const checkCondition = async () => {
            if (!condition) {
                router.push(redirectTo);
            } else {
                setIsLoading(false);
            }
        };

        checkCondition();
    }, [router, condition]);

    if (isLoading) {
        return null;
    }

    return <>{children}</>;
}