import Link from 'next/link';
import { ParkingSquare } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-2xl font-bold font-headline text-primary ${className}`}>
      <ParkingSquare className="h-8 w-8" />
      <span>ParkEase</span>
    </Link>
  );
}
