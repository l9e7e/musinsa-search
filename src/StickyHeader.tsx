import { ReactNode } from 'react';

interface StickyHeader {
  children: ReactNode;
}

export default function StickyHeader({ children }: StickyHeader) {
  return <div className='sticky top-0 z-10 bg-white'>{children}</div>;
}
