
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import type { Booking } from '@/types';
import { mockBookings as initialMockBookings } from '@/lib/placeholder-data';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (newBooking: Booking) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(initialMockBookings);

  const addBooking = useCallback((newBooking: Booking) => {
    setBookings((prevBookings) => [...prevBookings, newBooking]);
  }, []);

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContext() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
}
