'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { useParams } from 'next/navigation';
import { TextField, Button, Box } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

type Message = { sender: string, text: string, createdAt: number };

const RoomPage: React.FC = () => {
    const { socket, login } = useAuth();
    const router = useRouter();
    const { roomName } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const userId = sessionStorage.getItem('user-id');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        login()
    }, [login])

    useEffect(() => {
        if (socket && roomName) {
            socket.emit('join', roomName);
            socket.emit('room-info', roomName);
            socket.on('room-info', room => {
                setMessages(room.messages)
            });
        }
    }, [socket, roomName]);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        };
    }, [messages])

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            const isNearBottom = chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight < 500;
            if (isNearBottom) {
                setTimeout(() => {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }, 0);
            }
        }
    }, [messages])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim() !== '') {
            socket?.emit('message', { text: message, roomName });
            socket?.on("message", (m) => {
                setMessages([...messages, m]);
            })
            setMessage('');
        }
    };

    const handleLeft = () => {
        router.push('/rooms');
    };

    const handleLeaveRoom = () => {
        socket?.emit('left', roomName);
        router.push('/rooms');
    };

    return (
        <ProtectedRoute>
            <Box className="h-full">
                <div className="flex flex-row justify-between">
                    <Button variant="contained" onClick={handleLeft}>
                        뒤로가기
                    </Button>
                    <Button className="mx-1" variant="contained" color="error" onClick={handleLeaveRoom}>
                        나가기
                    </Button>
                </div>

                <div className="h-[80%] my-5">
                    <div ref={chatContainerRef} className='h-full border-2 rounded-lg overflow-y-auto px-1 py-1'>
                        {!messages || null ? (
                            <div className="h-full">
                                없노...
                            </div>
                        ) : (
                            messages.map((message: Message, index: number) => (
                                <div key={index} className="w-full my-2">
                                    {(userId == message.sender) ? (
                                        <div>
                                            <div className="flex justify-end">
                                                <div className='bg-blue-600 text-white rounded-md px-4 py-2 inline-block max-w-[60%]'>
                                                    <div className="w-full flex flex-wrap">
                                                        <p className="w-full" style={{ wordBreak: 'break-all' }}>{message.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="font-normal text-sm">{`${message.sender}`}</p>
                                            <div className='bg-gray-200 rounded-md px-4 py-2 inline-block max-w-[60%]'>
                                                <div className="w-full flex flex-wrap">
                                                    <p className="w-full" style={{ wordBreak: 'break-all' }}>{message.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )
                        }
                        <Box component="form" onSubmit={handleSubmit} className="sticky !bottom-0 z-50">
                            <div className="w-full p-4">
                                <div className="relative flex shadow-md">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none"
                                        placeholder="메시지를 입력하세요..."
                                    />
                                    <button
                                        className="px-4 py-2 rounded-r-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Box>
                    </div>
                </div>

            </Box>
        </ProtectedRoute>
    );
};

export default RoomPage;