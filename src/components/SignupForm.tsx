'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, password }),
            });

            if (response.ok) {
                router.push('/signin');
            } else {
                const data = await response.json();
                setError(data.error || '회원가입 실패');
            }
        } catch (error) {
            setError('회원가입 요청 중 오류 발생');
        }
    };

return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="id"
            label="ID"
            name="id"
            autoFocus
            value={id}
            inputProps={{ minLength: 4, maxLength: 20 }}
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
            value={password}
            inputProps={{ minLength: 4, maxLength: 25 }}
            onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Sign Up
        </Button>
        <Typography variant="body2" align="center">
            이미 계정이 있으신가요?{' '}
            <Link href="/signin">로그인</Link>
        </Typography>
    </Box>
);
};

export default SignupForm;