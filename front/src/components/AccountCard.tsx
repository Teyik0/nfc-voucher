'use client';

import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

import { useAccount } from 'wagmi';
import { useBalance } from 'wagmi';
import { useEffect, useState } from 'react';

export default function AccountCard() {
  const { address } = useAccount();
  const [balance, setBalance] = useState(0);
  const result = useBalance({
    address: address,
  });
  useEffect(() => {
    setBalance(Number(result.data?.formatted) || 0);
  }, [address, result]);
  return (
    <Card>
      <CardHeader className='flex flex-row items-center space-y-0'>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col text-sm'>
        <div>
          <div className='flex gap-2 items-center'>
            <strong>Address</strong>
            <Button className='h-4 w-4' size='icon' variant='ghost'>
              <Copy size={16} strokeWidth={1.5} />
            </Button>
          </div>
          <code className='text-xs select-all'>{address}</code>
        </div>
        <div className='flex gap-2 mt-4'>
          <strong>Balance</strong>
          <span>{balance} ETH</span>
        </div>
      </CardContent>
    </Card>
  );
}
