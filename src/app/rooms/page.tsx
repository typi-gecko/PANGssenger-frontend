// app/chat/page.tsx
'use client';

import { useState } from 'react';
import RoomCard from '@/components/RoomCard';

export default function RoomListPage() {
    const [rooms] = useState([
        { id: '1', name: '300KG 암컷 티라노사우르스 우울한데 통화하실분?' },
        { id: '2', name: '03 서울 섹트하실 변녀 구함 (급구)' },
    ]);

    return (
        <div>
            <div className="my-5 font-extrabold text-xl">채팅방 목록</div>
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
            ))}
        </div>
    );
}
