'use client';

import { useState, useEffect } from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { set, z } from 'zod';
import { toast } from 'sonner';
import { useAccount, useBalance } from 'wagmi';
import { CreditCard } from 'lucide-react';
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
  const [cardInfo, setCardInfo] = useState<CardInfo>({ uid: '', atr: '' });
  const [inputData, setInputData] = useState<string>('');

  const { address } = useAccount();
  const [balance, setBalance] = useState(0);
  const result = useBalance({
    address: address,
  });
  useEffect(() => {
    setBalance(Number(result.data?.formatted) || 0);
  }, [address, result]);

  const handleClick = () => {
    try {
      if (!address) throw new Error('Connect to your wallet first');
      const amountParsed: number = schema.parse(parseFloat(amount));
      if (balance < amountParsed) throw new Error('Insufficient funds');
      setOpen(true);
    } catch (err: any) {
      toast.error('Error', {
        description: err.message,
      });
      setOpen(false);
      return;
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setAmount('0');
    toast.error('Scan has not been completed');
  };

  const handleValidate = () => {
    try {
      const cardId = uuidv4().slice(0, 8);
      const cardId = uuidv4().slice(0, 8);
      socket.emit('writeToCard', cardId);
      toast.success('Success', {
        description: `Pre paid card created with id: ${uuidv4()}, amount: ${amount} and badge: ${cardInfo}`,
      });
    } catch (error: any) {
      toast.error('Error', {
        description: error.message,
      });
    }
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
              <AlertDialogDescription className='flex flex-col gap-8 m-auto items-center justify-center pt-4'>
                {cardInfo ? (
                  <div className='flex gap-8 items-center '>
                    <CreditCard size={64} className='rotate-12' />
                    <Label htmlFor='badge'>card uid: 2424</Label>
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

export default CreatePrePaidCard;
