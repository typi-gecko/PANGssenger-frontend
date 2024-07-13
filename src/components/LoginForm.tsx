'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // 로직
        router.push('/rooms');
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
                LogIn
            </Button>
            <Typography variant="body2" align="center">
                계정이 없으신가요?{' '}
                <Link href="/signup">회원가입</Link>
            </Typography>
        </Box>
    );
};

export default LoginForm;
