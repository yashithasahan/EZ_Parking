
'use client';
import { Header } from '@/components/shared/Header';
import { StatCard } from './components/StatCard';
import { ParkingLot } from './components/ParkingLot';
import { BookingItem } from './components/BookingItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Car, CheckCircle2, ListChecks, Ticket } from "lucide-react";
import type { ParkingSlot, Booking } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, use } from "react";
import { useBookingContext } from "@/context/BookingContext";
import { getAllSlots } from "@/service/dashboard_service";
import { MyBookingsSection } from "./components/MyBookingsSection";

export default function DashboardPage() {
  const router = useRouter();
  const { bookings: contextBookings } = useBookingContext();

  const [totalSlots, setTotalSlots] = useState<number | string>("...");
  const [availableSlots, setAvailableSlots] = useState<number | string>("...");
  const [occupiedSlots, setOccupiedSlots] = useState<number | string>("...");

  const [currentParkingSlots, setCurrentParkingSlots] = useState<ParkingSlot[]>(
    []
  );
  const [currentYear, setCurrentYear] = useState<number>(() =>
    new Date().getFullYear()
  );

  const [isClientMounted, setIsClientMounted] = useState(false);

  useEffect(() => {
    fetchAllSlots();
  }, []);

  const fetchAllSlots = async () => {
    try {
      const data = await getAllSlots();
      setCurrentParkingSlots(data);
      const calculatedTotalSlots = data.length;
      const calculatedAvailableSlots = data.filter(
        (slot) => !slot.is_occupied && !slot.is_reserved
      ).length;
      const calculatedOccupiedSlots = data.filter(
        (slot) => slot.is_occupied || slot.is_reserved
      ).length;

      setTotalSlots(calculatedTotalSlots);
      setAvailableSlots(calculatedAvailableSlots);
      setOccupiedSlots(calculatedOccupiedSlots);

      setCurrentYear(new Date().getFullYear());
      setIsClientMounted(true);
    } catch (error) {
      console.error("Error fetching parking slots:", error);
    }
  };

  const activeBookings = useMemo(() => {
    if (!isClientMounted || !contextBookings) return [];
    return contextBookings.filter((booking) => booking.status === "active");
  }, [isClientMounted, contextBookings]);

  const handleBookNow = () => {
    router.push("/dashboard/book");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-8">
        {/* Statistics Section */}
        <section>
          <h1 className="text-3xl font-bold font-headline mb-6">
            Dashboard Overview
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <StatCard
              title="Total Slots"
              value={totalSlots}
              icon={<ListChecks className="h-6 w-6" />}
              description="All parking spots in the facility."
            />
            <StatCard
              title="Available Slots"
              value={availableSlots}
              icon={<CheckCircle2 className="h-6 w-6" />}
              description="Ready for new bookings."
            />
            <StatCard
              title="Occupied/Reserved"
              value={occupiedSlots}
              icon={<Car className="h-6 w-6" />}
              description="Currently in use or reserved."
            />
          </div>
        </section>

        {/* Parking Lot Visualization & Booking CTA */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold font-headline mb-4">
              Parking Lot Layout
            </h2>
            {isClientMounted ? (
              <ParkingLot slots={currentParkingSlots} />
            ) : (
              <Card>
                <CardContent className="pt-6 flex items-center justify-center min-h-[200px]">
                  <p>Loading parking lot...</p>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="lg:sticky lg:top-24">
            {" "}
            {/* Sticky for larger screens */}
            <h2 className="text-2xl font-semibold font-headline mb-4">
              Reserve Your Spot
            </h2>
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
        <MyBookingsSection />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {currentYear} EZPark. All rights reserved.
      </footer>
    </div>
  );
}
