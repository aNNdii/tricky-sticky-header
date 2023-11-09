'use client';

import { useScrollDirection } from '../hooks/useScrollDirection';

import { DisappearingHeader } from './DisappearingHeader';
import { ProductHeader } from './ProductHeader';

export function Header() {
  const scrollDirection = useScrollDirection()

  return (
    <div className={`${scrollDirection === "down" ? '-top-16' : 'top-0'} sticky z-10 transition-[top] duration-500`}>
      <DisappearingHeader />
      <ProductHeader />
    </div>
  );
}
