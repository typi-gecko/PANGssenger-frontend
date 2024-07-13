'use client';

import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Link,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { io, Socket } from 'socket.io-client';

const SigninForm: React.FC = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { login } = useAuth();
    let socket: Socket;

    useEffect(() => {
        socket = io('http://117.110.121.213:3003')

        socket.on("connect", () => {
            console.log("Connected to server");
            socket.emit("helloServer", "Hello, Server!");
        });

        socket.on("helloClient", (msg) => {
            console.log(msg);
            socket.disconnect();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://117.110.121.213:3003/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, password }),
            });

            if (response.ok) {
                const { token, ...userData } = await response.json();
                localStorage.setItem('token', token);
                const socket = io('http://117.110.121.213:3003', {
                    auth: {
                        token: `Bearer ${token}`
                    },
                });
                socket.on('connect', () => {
                    userData.socketId = socket.id;
                    login(userData);
                    localStorage.setItem('user', JSON.stringify(userData));
                    router.push('/rooms');
                });
            } else {
                if (response.status === 401) {
                    setError('아이디 또는 비밀번호가 올바르지 않습니다.');
                } else if (response.status === 404) {
                    setError('존재하지 않는 아이디입니다.');
                } else {
                    const data = await response.json();
                    setError(data.error || '로그인 실패');
                }
            }
        } catch (error) {
            setError('로그인 요청 중 오류 발생');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} >
            <TextField
                margin="normal"
                required
                fullWidth
                id="id"
                label="ID"
                name="id"
                autoComplete="username"
                autoFocus
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            <Typography variant="body2" align="center">
                계정이 없으신가요?{' '}
                <Link href="/signup">회원가입</Link>
            </Typography>
        </Box>
    );
};

export default SigninForm;
