'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard } from 'lucide-react';

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
                  <span className=''>Account Abstraction</span>
                </Link>
              </div>
              <div className='flex-1'>
                <nav className='grid items-start text-sm font-medium'>
                  <Link
                    className={`${styleItem} ${
                      pathname === '/' && 'bg-gray-300'
                    }`}
                    href='/'
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  {/* <Link
                    className={`${styleItem} ${
                      pathname === '/products' && 'bg-gray-300'
                    }`}
                    href='/products'
                  >
                    <Package size={20} />
                    Browse products
                  </Link>
                  <Link
                    className={`${styleItem} ${
                      pathname === '/products/new' && 'bg-gray-300'
                    }`}
                    href='/products/new'
                  >
                    <Package size={20} />
                    New products
                  </Link>
                  <Link
                    className={`${styleItem} ${
                      pathname === '/customers' && 'bg-gray-300'
                    }`}
                    href='/customers'
                  >
                    <Users size={20} />
                    Customers
                  </Link> */}
                  {/* <Link
                    className={`${styleItem} ${
                      pathname === '/orders' && 'bg-gray-300'
                    }`}
                    href='/orders'
                  >
                    <ShoppingCart size={20} />
                    Orders
                  </Link>
                  <Link
                    className={`${styleItem} ${
                      pathname === '/analytics' && 'bg-gray-300'
                    }`}
                    href='/analytics'
                  >
                    <LineChart size={20} />
                    Analytics
                  </Link>
                  <Link
                    className={`${styleItem} ${
                      pathname === '/settings' && 'bg-gray-300'
                    }`}
                    href='/settings'
                  >
                    <Settings size={20} />
                    Settings
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
