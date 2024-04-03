import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from './ui/separator';

const TransactionCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>Your recent transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-4'>
          <ArrowUpIcon className='text-green-500 h-6 w-6' />
          <div className='grid gap-1 text-sm'>
            <div>Outgoing transaction</div>
            <div className='text-gray-500 dark:text-gray-400'>To: 0x4be...</div>
          </div>
          <div className='ml-auto font-medium'>-2.3456 ETH</div>
        </div>
        <Separator className='my-2' />
        <div className='flex items-center gap-4'>
          <ArrowDownIcon className='text-blue-500 h-6 w-6' />
          <div className='grid gap-1 text-sm'>
            <div>Incoming transaction</div>
            <div className='text-gray-500 dark:text-gray-400'>
              From: 0x1a2...
            </div>
          </div>
          <div className='ml-auto font-medium'>+5.0000 ETH</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
