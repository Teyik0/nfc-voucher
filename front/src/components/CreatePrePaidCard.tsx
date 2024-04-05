'use client';

import { useState, useEffect } from 'react';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from './ui/input-otp';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { toast } from 'sonner';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

interface CardInfo {
  uid: string;
  atr: string;
}

const schema = z.number().positive();

const CreatePrePaidCard = () => {
  const [amount, setAmount] = useState('0');
  const [open, setOpen] = useState(false);
  const [badge, setBadge] = useState<string | null>('test-badge');
  const [cardInfo, setCardInfo] = useState<CardInfo>({ uid: '', atr: '' });
  const [inputData, setInputData] = useState<string>('');

  const handleClick = () => {
    try {
      schema.parse(parseFloat(amount));
    } catch (err: any) {
      toast.error('Error', {
        description: err.message,
      });
      setOpen(false);
      return;
    }

    setOpen(true);
    const cardId = uuidv4().slice(0, 8);
    socket.emit('writeToCard', cardId);
    toast.success('Success', {
      description: `Pre paid card created with id: ${cardId}`,
    });
  };

  useEffect(() => {
    socket.on('cardDetected', (data: { uid: string; data: string }) => {
        console.log('Card detected:', data);
        setCardInfo({
            uid: data.uid,
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

useEffect(() => {
  socket.on('cardRemoved', (data: string) => {
      console.log('Card removed:', data);
      setCardInfo({
          uid: "",
          atr: ""
      });
  });

  return () => {
    socket.off('cardRemoved');
  };
}, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a pre paid card</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='flex flex-col gap-1'>
          <Label className='text-sm' htmlFor='amount'>
            Amount
          </Label>
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
      </CardContent>
      <CardFooter className='flex gap-2'>
        <AlertDialog open={open}>
          <Button onClick={handleClick} variant='outline'>
            Create
          </Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Scan your badge</AlertDialogTitle>
              <AlertDialogDescription className='flex flex-col gap-8 m-auto items-center justify-center'>
                <img src='/spinner.gif' alt='spinner' className='w-24 h-24' />
                <h1>Données de la carte NFC</h1>
                <p>UID: {cardInfo.uid}</p>
                <p>ATR: {cardInfo.atr}</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                onClick={() => {
                  setOpen(false);
                  toast.error('Scan has not been completed');
                }}
                variant='outline'
              >
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default CreatePrePaidCard;
