import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

const SendTransactionCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Transaction</CardTitle>
        <CardDescription>
          Enter the recipient address and amount
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='flex flex-col gap-1'>
          <Label className='text-sm' htmlFor='recipient'>
            Recipient
          </Label>
          <Input id='recipient' placeholder='Enter address' />
        </div>
        <div className='flex flex-col gap-1'>
          <Label className='text-sm' htmlFor='amount'>
            Amount
          </Label>
          <Input id='amount' placeholder='Enter amount' />
        </div>
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Button>Send</Button>
        <Button variant='outline'>Reset</Button>
      </CardFooter>
    </Card>
  );
};

export default SendTransactionCard;
