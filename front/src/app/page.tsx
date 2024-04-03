import AccountCard from '@/components/AccountCard';
import NewAccountCard from '@/components/NewAccountCard';
import SendTransactionCard from '@/components/SendTransactionCard';
import TransactionCard from '@/components/TransactionCard';

export default function Home() {
  return (
    <div className='p-4'>
      <div className='bg-white p-6 rounded-md shadow-md min-h-[calc(100vh-2rem)]'>
        <div className='grid grid-cols-2 gap-4'>
          <AccountCard />
          <TransactionCard />
          <SendTransactionCard />
          <NewAccountCard />
        </div>
      </div>
    </div>
  );
}
