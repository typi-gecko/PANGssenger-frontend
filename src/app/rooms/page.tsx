'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { Button, List, ListItemText, Box, Typography } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

const RoomsPage: React.FC = () => {
    const { socket, login } = useAuth();
    const router = useRouter();
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        login()
    }, [login])

    useEffect(() => {
        const token = sessionStorage.getItem('access-token');
        if (socket && token) {
            socket.emit("list", 'entire')
            socket.on("list", (rooms: any) => {
                const newRoomList = rooms.map((room: any) => room.name);
                setRoomList(newRoomList);
            });
        }
    }, [socket]);

    const handleCreateRoom = () => {
        router.push('/rooms/create');
    };

    const handleJoinRoom = (roomName: string) => {
        router.push(`/rooms/${roomName}`);
    };

    return (
        <ProtectedRoute>
            <Box>
                <Typography variant="h4" gutterBottom>
                    채팅방 목록
                </Typography>
                <Button variant="contained" onClick={handleCreateRoom}>
                    채팅방 생성
                </Button>
                <List className=' overflow-hidden'>
                    {roomList.map((room, index) => (
                        <div key={index} className="w-full bg-gray-50 rounded-lg shadow-md my-1 flex flex-row">
                            <ListItemText primary={room} className='px-4 py-3 text-sm font-medium text-gray-900' />
                            <button
                                onClick={() => handleJoinRoom(room)}
                                className="px-2 py-1 text-lg text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                참가
                            </button>
                        </div>
                    ))}
                </List>
            </Box>
        </ProtectedRoute>
    );
};

export default RoomsPage;