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
        setError(null); // 에러 메시지 초기화
        router.push('/');
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField // 비밀번호 확인 입력 필드 추가
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
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
                SignUp
            </Button>
            <Typography variant="body2" align="center">
                이미 계정이 있으신가요?{' '}
                <Link href="/">로그인</Link>
            </Typography>
        </Box>
    );
};

export default SignupForm;