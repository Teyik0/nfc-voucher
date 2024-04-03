import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCcw } from 'lucide-react';

export default function AccountCard() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center space-y-0'>
        <CardTitle>Account</CardTitle>
        <Button className='ml-auto h-8 w-8' size='icon' variant='secondary'>
          <RefreshCcw />
          <span className='sr-only'>Refresh</span>
        </Button>
      </CardHeader>
      <CardContent className='flex flex-col text-sm'>
        <div>
          <div className='flex gap-2 items-center'>
            <strong>Address</strong>
            <Button className='h-4 w-4' size='icon' variant='ghost'>
              <Copy size={16} strokeWidth={1.5} />
            </Button>
          </div>
          <code className='text-xs select-all'>
            0x5a4E8a7f0e6d7b5fF6D8dE5b9c2dC2bDc3c8A3b1
          </code>
        </div>
        <div className='flex gap-2'>
          <strong>Balance</strong>
          <span>3.1416 ETH</span>
        </div>
      </CardContent>
    </Card>
  );
}
