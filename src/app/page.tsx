"use client"
import React from 'react';
import ConnectWallet from '@/utils/ConnectWallet';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <>
      <header>
        <h4>Products DAPP</h4>
        <ConnectWallet />
      </header>
      <HeroSection/>
    </>
  )
}
