// components/RoomCard.tsx
'use client';

import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useRouter } from 'next/navigation';

interface RoomCardProps {
    room: {
        id: string;
        name: string;
    };
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/chat/${room.id}`);
    };

    return (
        <Card className='mb-2'>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <span className="font-semibold">
                        {room.name}
                    </span>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default RoomCard;
