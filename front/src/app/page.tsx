import AccountCard from '@/components/AccountCard';
import ClaimCard from '@/components/ClaimCard';
import CreatePrePaidCard from '@/components/CreatePrePaidCard';
import TransactionCard from '@/components/TransactionCard';

const page = () => {
  return (
    <div className='p-4'>
      <div className='bg-white p-6 rounded-md shadow-md min-h-[calc(100vh-2rem)]'>
        <div className='grid grid-cols-2 gap-4'>
          <AccountCard />
          <TransactionCard />
          <CreatePrePaidCard />
          <ClaimCard />
        </div>
      </div>
    </div>
  );
};

export default page;
