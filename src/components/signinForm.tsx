'use client';

import { verify } from "jsonwebtoken";
import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Link,
    Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

const SigninForm: React.FC = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login, logout } = useAuth();
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/sign-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, password }),
            });

            if (response.ok) {
                const tokenText = await response.text();
                try {
                    const { accessToken, refreshToken } = JSON.parse(tokenText) as { accessToken: string, refreshToken: string };
                    try {
                        const a = accessToken;
                        const payload = verify(a, process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET_KEY);
                        console.log(payload)
                        if (typeof payload === 'object' && 'id' in payload) {
                            sessionStorage.setItem('user-id', payload.id);
                        }
    
                    } catch (error) {
                        console.log(error);
                        logout();
                    }

                    sessionStorage.setItem('access-token', accessToken);
                    sessionStorage.setItem('refresh-token', refreshToken);
                    login();
                } catch (error) {
                    throw new Error("token json을 파싱하는 과정 중 오류가 발생하였습니다.");
                } finally {
                    router.push("/rooms");
                }
            } else {
                if (response.status === 403 || 401) {
                    setError('아이디 또는 비밀번호가 존재하지 않거나, 올바르지 않습니다.');
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
            {error && (
                <Alert 
                    severity="error" 
                    variant="filled"
                >
                    {error}
                </Alert>
            )}
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
