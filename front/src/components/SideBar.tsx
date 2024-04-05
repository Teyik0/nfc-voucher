'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HandCoins, LayoutDashboard, PackagePlus } from 'lucide-react';
import ConnectButton from './ConnectButton';

const SideBar = () => {
  const pathname = usePathname();
  const styleItem = `flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900  
  transition-all hover:text-gray-900`;

  return (
    <div className='flex flex-col justify-between h-screen min-h-screen bg-gray-100 py-4 pl-4'>
      <div>
        <div className='grid w-full overflow-hidden lg:grid-cols-[200px]'>
          <div className='hidden lg:block'>
            <div className='flex flex-col gap-2'>
              <div className='flex h-[60px] items-center'>
                <Link
                  className='flex items-center gap-2 font-semibold'
                  href='/'
                >
                  <LayoutDashboard />
                  <span className=''>NFC Voucher</span>
                </Link>
              </div>
              <ConnectButton />
              <div className='flex-1'>
                <nav className='grid items-start text-sm font-medium gap-2'>
                  <Link
                    className={`${styleItem} ${
                      pathname === '/' && 'bg-gray-300'
                    }`}
                    href='/'
                  >
                    <HandCoins size={18} />
                    Dashboard
                  </Link>
                  {/* <Link
                    className={`${styleItem} ${
                      pathname === '/claim' && 'bg-gray-300'
                    }`}
                    href='/claim'
                  >
                    <PackagePlus size={18} />
                    Claim
                  </Link> */}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
