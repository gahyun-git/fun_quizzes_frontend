import { ReactNode } from 'react';

export const metadata = {
  title: '전생 테스트',
};

export default function PastLifeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </div>
  );
}