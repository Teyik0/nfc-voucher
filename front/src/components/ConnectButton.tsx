'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Button } from './ui/button';
import { useAccount, useDisconnect } from 'wagmi';

const ConnectButton = () => {
  const { open, close } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  if (address)
    return (
      <Button onClick={() => disconnect()}>{shortenAddress(address)}</Button>
    );
  return <Button onClick={() => open()}>Connect Wallet</Button>;
};

function shortenAddress(address: `0x${string}`, length = 8) {
  if (address.length <= length) {
    return address; // If address length is less than or equal to desired length, return as is
  } else {
    const prefix = address.slice(0, length / 2);
    const suffix = address.slice(-length / 2);
    return prefix + '...' + suffix; // Shorten the address by taking the first half and last half
  }
}

export default ConnectButton;
