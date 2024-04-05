'use client'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

interface CardInfo {
  uid: string;
  atr: string;
}

// TypeScript version of bufferToHex function
// If you're dealing with an actual ArrayBuffer from an API response or similar in this component, 
// ensure you adjust types as necessary. This function might not be used directly if `data.data` is already a string.
function bufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

const test: React.FC = () => {
    const [cardInfo, setCardInfo] = useState<CardInfo>({ uid: '', atr: '' });
    const [inputData, setInputData] = useState<string>('');

    useEffect(() => {
        socket.on('cardDetected', (data: { uid: string; data: string }) => {
            console.log('Card detected:', data);
            setCardInfo({
                uid: data.uid,
                // Assuming `data.data` is a string, if it's an ArrayBuffer, use `bufferToHex(data.data)`
                atr: data.data
            });
        });
        return () => {
          socket.off('cardDetected');
        };
    }, []);

    useEffect(() => {
        socket.on('writeSuccess', (data: { uid: string; data: string }) => {
            console.log('card writed successfully:', data);
            setCardInfo({
                uid: data.uid,
                atr: data.data
            });
        });

        return () => {
          socket.off('writeSuccess');
        };
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit('writeToCard', inputData);
    };

    return (
        <div>
            <h1>Données de la carte NFC</h1>
            <p>UID: {cardInfo.uid}</p>
            <p>ATR: {cardInfo.atr}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder="Données à écrire"
                />
                <button type="submit">Écrire</button>
            </form>
        </div>
    );
}

export default test;
