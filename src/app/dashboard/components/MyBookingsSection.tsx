"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookingItem } from "./BookingItem";
import type { Booking } from "@/types";
import { getMyBookings } from "@/service/dashboard_service"; // We will use the existing service function
import { supabase } from "@/lib/supabase";
export function MyBookingsSection() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const userBookings = await getMyBookings(user.id);
        setBookings(userBookings);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Could not load your bookings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const activeBookings = bookings.filter(
    (booking) => booking.status === "active"
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <Card>
          <CardContent className="pt-6 flex items-center justify-center min-h-[100px]">
            <p>Loading your bookings...</p>
          </CardContent>
        </Card>
      );
    }

    if (error) {
      return (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-destructive">{error}</p>
          </CardContent>
        </Card>
      );
    }

    if (activeBookings.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {activeBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      );
    }

    return (
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            You have no active bookings at the moment.
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold font-headline mb-4">
        Your Active Bookings
      </h2>
      {renderContent()}
    </section>
  );
}
