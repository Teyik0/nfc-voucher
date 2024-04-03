'use client';

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

const CreatePrePaidCard = () => {
  const handleClick = () => {
    const cardId = uuidv4();
    console.log(cardId);
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
          <Input id='amount' placeholder='Enter amount' />
        </div>
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Button onClick={handleClick}>Create</Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePrePaidCard;
