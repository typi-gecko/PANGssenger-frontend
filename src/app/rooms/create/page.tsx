'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { TextField, Button, Box, Typography } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

const CreateRoomPage: React.FC = () => {
    const { socket } = useAuth();
    const router = useRouter();
    const [roomName, setRoomName] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        socket?.emit('create', roomName);
        router.push('/rooms');
    };

    return (
        <ProtectedRoute>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h4" gutterBottom>
                    채팅방 생성
                </Typography>
                <TextField
                    label="채팅방 이름"
                    value={roomName}
                    fullWidth
                    margin="normal"
                    onChange={(e) => setRoomName(e.target.value)}
                    inputProps={{
                        pattern: "[a-zA-Z\s]*",
                        title: "영어만 입력해주세요.",
                    }}
                    />
                <Button type="submit" variant="contained">
                    생성
                </Button>
            </Box>
        </ProtectedRoute>
    );
};

export default CreateRoomPage;
