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
import { CardInfo, paymasterEndpoint } from '@/lib/utils';
import { CreditCard } from 'lucide-react';
import io from 'socket.io-client';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';
import { set } from 'zod';

const socket = io('http://localhost:3001');

const ClaimCard = () => {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardInfo>({ uid: '', atr: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (!address) {
      toast.error('Connect to your wallet first');
      return;
    }
    setOpen(true);
  };

  const handleValidate = () => {
    setIsLoading(true);
    fetch(`http://localhost:3002/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: cardInfo.uid, dest: address }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success('Claimed successfully');
        }
        setIsLoading(false);
        setOpen(false);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    toast.error('Claim canceled');
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
              {isLoading ? (
                <div className='flex justify-center items-center'>
                  <div
                    className={`animate-spin rounded-full h-8 w-8 border-b-2 border-red-700`}
                  />
                </div>
              ) : (
                <div>
                  {cardInfo && (
                    <Button onClick={() => handleValidate()}>Valider</Button>
                  )}
                  <Button onClick={() => handleCancel()} variant='outline'>
                    Cancel
                  </Button>
                </div>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ClaimCard;
