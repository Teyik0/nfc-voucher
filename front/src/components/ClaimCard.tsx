'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';

import { useEffect, useState } from 'react';
import { CardInfo } from '@/lib/utils';
import { CreditCard } from 'lucide-react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const ClaimCard = () => {
  const [open, setOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardInfo>({ uid: '', atr: '' });
  const handleClick = () => {
    setOpen(true);
  };
  const handleValidate = () => {};
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    socket.on('cardDetected', (data: { uid: string; data: string }) => {
      console.log('Card detected:', data);
      setCardInfo({
        uid: data.uid,
        atr: data.data,
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
        atr: data.data,
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
        uid: '',
        atr: '',
      });
    });

    return () => {
      socket.off('cardRemoved');
    };
  }, []);

  return (
    <Card className='w-full flex flex-col justify-between'>
      <CardHeader>
        <CardTitle>Claim</CardTitle>
        <CardDescription className='mt-1'>
          Click the button below to ask for claim and get your reward
        </CardDescription>
      </CardHeader>
      <CardContent className='flex items-center p-4'></CardContent>
      <CardFooter>
        <AlertDialog open={open}>
          <Button onClick={handleClick} variant='outline'>
            Ask for Claim
          </Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Scan your badge</AlertDialogTitle>
              <AlertDialogDescription className='flex flex-col gap-8 m-auto items-center justify-center pt-4'>
                {cardInfo.uid ? (
                  <div className='flex gap-8 items-center '>
                    <CreditCard size={64} className='rotate-12' />
                    <Label htmlFor='badge'>card uid: {cardInfo.uid}</Label>
                  </div>
                ) : (
                  <img src='/spinner.gif' alt='spinner' className='w-24 h-24' />
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {cardInfo && (
                <Button onClick={() => handleValidate()}>Valider</Button>
              )}
              <Button onClick={() => handleCancel()} variant='outline'>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ClaimCard;
