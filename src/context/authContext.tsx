'use client';

import { useState, createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';



interface AuthContextType {
    login: () => void;
    logout: () => void;
    socket: Socket | null;
}

const AuthContext = createContext<AuthContextType>({
    login: () => { },
    logout: () => { },
    socket: null
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const router = useRouter();

    const connectSocket = async (token: string) => {
        try {
            const newSocket = io(`${process.env.NEXT_PUBLIC_URL}`, {
                auth: {
                    token: `${token}`,
                },
            });

            newSocket.on('connect', () => {
                console.log('Socket.IO connected');
                setSocket(newSocket);
            });

        } catch (error) {
            console.error('Socket.IO connection error:', error);
        }
    };

    const login = async () => {
        const accessToken = sessionStorage.getItem('access-token');
        if (!accessToken) throw new Error("cannot find access token.");
        // if (!accessToken) {console.log("cannot find access token."); router.push('/')};
        try {
            await connectSocket(accessToken);
        } catch (error) {
            console.error('Login error:', error);
            logout();
        } finally {
            console.log("로그인 잘됨")
        }
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        socket?.disconnect();
        setSocket(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ login, logout, socket }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};