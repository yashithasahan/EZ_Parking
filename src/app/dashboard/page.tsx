
'use client';
import { Header } from '@/components/shared/Header';
import { StatCard } from './components/StatCard';
import { ParkingLot } from './components/ParkingLot';
import { BookingItem } from './components/BookingItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockParkingSlots, mockBookings } from '@/lib/placeholder-data';
import { Car, CheckCircle2, ListChecks, Ticket } from 'lucide-react';
import type { ParkingSlot } from '@/types';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const totalSlots = mockParkingSlots.length;
  const availableSlots = mockParkingSlots.filter(slot => slot.status === 'available').length;
  const occupiedSlots = mockParkingSlots.filter(slot => slot.status === 'occupied' || slot.status === 'reserved').length;
  
  const activeBookings = mockBookings.filter(booking => booking.status === 'active');

  const handleBookNow = () => {
    router.push('/dashboard/book');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-8">
        {/* Statistics Section */}
        <section>
          <h1 className="text-3xl font-bold font-headline mb-6">Dashboard Overview</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <StatCard title="Total Slots" value={totalSlots} icon={<ListChecks className="h-6 w-6" />} description="All parking spots in the facility." />
            <StatCard title="Available Slots" value={availableSlots} icon={<CheckCircle2 className="h-6 w-6" />} description="Ready for new bookings." />
            <StatCard title="Occupied/Reserved" value={occupiedSlots} icon={<Car className="h-6 w-6" />} description="Currently in use or reserved." />
          </div>
        </section>

        {/* Parking Lot Visualization & Booking CTA */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold font-headline mb-4">Parking Lot Layout</h2>
            <ParkingLot slots={mockParkingSlots} />
          </div>
          <div className="lg:sticky lg:top-24"> {/* Sticky for larger screens */}
            <h2 className="text-2xl font-semibold font-headline mb-4">Reserve Your Spot</h2>
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <p className="mb-4 text-muted-foreground">
                  Quickly find and book an available parking slot.
                </p>
                <Button 
                  onClick={handleBookNow}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <Ticket className="mr-2 h-5 w-5" /> Book a Slot Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Current Bookings Management Section */}
        <section>
          <h2 className="text-2xl font-semibold font-headline mb-4">Your Active Bookings</h2>
          {activeBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {activeBookings.map(booking => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <Card className="shadow-md">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">You have no active bookings at the moment.</p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} EZPark. All rights reserved.
      </footer>
    </div>
  );
}
