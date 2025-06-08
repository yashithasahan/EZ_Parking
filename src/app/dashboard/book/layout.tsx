
'use client';
import { Header } from '@/components/shared/Header';
import { BookingStepper, bookingStepsConfig } from './components/BookingStepper';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

function BookingLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getCurrentStep = () => {
    if (pathname.endsWith('/book') || pathname.endsWith('/book/')) return 0;
    if (pathname.includes('/vehicle-info')) return 1;
    if (pathname.includes('/payment')) return 2;
    // Assuming confirmation is part of payment or a separate non-stepper page
    return 3; 
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <BookingStepper currentStep={getCurrentStep()} steps={bookingStepsConfig.slice(0, 3)} />
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} EZPark. All rights reserved.
      </footer>
    </div>
  );
}


export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading booking section...</div>}>
      <BookingLayoutContent>{children}</BookingLayoutContent>
    </Suspense>
  );
}
