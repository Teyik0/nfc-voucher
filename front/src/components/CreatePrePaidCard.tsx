'use client';

import { useState } from 'react';

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

const schema = z.number().positive();

const CreatePrePaidCard = () => {
  const [amount, setAmount] = useState('0');
  const [open, setOpen] = useState(false);
  const [badge, setBadge] = useState<string | null>('test-badge');

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
    const cardId = uuidv4();
    toast.success('Success', {
      description: `Pre paid card created with id: ${cardId}`,
    });
  };

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
