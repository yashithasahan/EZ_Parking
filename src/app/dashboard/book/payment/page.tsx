
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle, ParkingSquare, CalendarDays, Clock, Car, Tag } from 'lucide-react';
import { format, parse, differenceInMinutes, setHours, setMinutes } from 'date-fns';
// Import mockBookings if you intend to "add" to it, though it won't persist client-side easily
// import { mockBookings } from '@/lib/placeholder-data';
// import type { Booking } from '@/types';


function PaymentPageForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const slotId = searchParams.get('slotId');
  const dateStr = searchParams.get('date');
  const startTimeStr = searchParams.get('startTime');
  const endTimeStr = searchParams.get('endTime');
  const plate = searchParams.get('plate');
  const type = searchParams.get('type');

  useEffect(() => {
    if (!slotId || !dateStr || !startTimeStr || !endTimeStr || !plate || !type) {
      toast({
        title: 'Missing Booking Information',
        description: 'Some details are missing. Please start over.',
        variant: 'destructive',
      });
      router.replace('/dashboard/book');
    }
  }, [slotId, dateStr, startTimeStr, endTimeStr, plate, type, router, toast]);

  const bookingDetails = useMemo(() => {
    if (!dateStr || !startTimeStr || !endTimeStr) return null;
    const dateObj = parse(dateStr, 'yyyy-MM-dd', new Date());
    const [startH, startM] = startTimeStr.split(':').map(Number);
    const [endH, endM] = endTimeStr.split(':').map(Number);
    
    const startDateTime = setMinutes(setHours(dateObj, startH), startM);
    const endDateTime = setMinutes(setHours(dateObj, endH), endM);
    
    const durationMinutes = differenceInMinutes(endDateTime, startDateTime);
    const durationHours = durationMinutes / 60;
    
    // Mock price: $5 per hour
    const price = Math.max(5, durationHours * 5); // Minimum $5

    return {
      formattedDate: format(dateObj, 'PPP'),
      startTime: startTimeStr,
      endTime: endTimeStr,
      duration: `${durationHours.toFixed(1)} hours (${durationMinutes} mins)`,
      price: price.toFixed(2),
      startDateTime,
      endDateTime
    };
  }, [dateStr, startTimeStr, endTimeStr]);


  const handleConfirmBooking = async () => {
    setIsLoading(true);
    // Simulate API call for booking
    await new Promise(resolve => setTimeout(resolve, 1500));

    // This is where you would typically call a backend service to create the booking.
    // For this demo, we'll just show a success toast.
    // If you were to modify mockBookings, it would be like:
    // const newBooking: Booking = {
    //   id: `booking-${Date.now()}`,
    //   slotId: slotId!,
    //   userId: 'user-mock', // Mock user ID
    //   vehiclePlate: plate!,
    //   startTime: bookingDetails!.startDateTime,
    //   endTime: bookingDetails!.endDateTime,
    //   status: 'active',
    // };
    // mockBookings.push(newBooking); // Note: This won't reflect globally without proper state management

    setIsLoading(false);
    toast({
      title: 'Booking Confirmed!',
      description: `Parking slot ${slotId?.split('-')[1]} for ${plate} is reserved.`,
      variant: 'default',
      duration: 5000,
    });
    router.replace('/dashboard'); // Use replace to prevent going back to payment page
  };

  const handleBack = () => {
    // Retain all query params except for maybe payment specific ones if any were added
    router.push(`/dashboard/book/vehicle-info?${searchParams.toString()}`);
  };

  if (!slotId || !plate || !type || !bookingDetails) {
     return <div className="flex justify-center items-center h-full"><p>Loading booking summary or redirecting...</p></div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Review and Confirm Booking</CardTitle>
        <CardDescription>Please review your booking details before confirming.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
          <h3 className="font-semibold text-lg mb-2">Booking Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <p className="flex items-center"><ParkingSquare className="mr-2 h-4 w-4 text-primary" /> Slot: <span className="font-medium ml-1">{slotId.split('-')[1]}</span></p>
            <p className="flex items-center"><Car className="mr-2 h-4 w-4 text-primary" /> Vehicle: <span className="font-medium ml-1">{plate} ({type})</span></p>
            <p className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-primary" /> Date: <span className="font-medium ml-1">{bookingDetails.formattedDate}</span></p>
            <p className="flex items-center"><Clock className="mr-2 h-4 w-4 text-primary" /> Time: <span className="font-medium ml-1">{bookingDetails.startTime} - {bookingDetails.endTime}</span></p>
          </div>
           <p className="flex items-center mt-2 text-sm"><Clock className="mr-2 h-4 w-4 text-primary" /> Duration: <span className="font-medium ml-1">{bookingDetails.duration}</span></p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Payment Details</h3>
          <p className="text-sm text-muted-foreground">Total Amount: <span className="text-xl font-bold text-primary">${bookingDetails.price}</span></p>
          <p className="text-xs text-muted-foreground mt-2">Payment processing is mocked for this demonstration. No actual charges will be made.</p>
          {/* Placeholder for payment form elements if needed in future */}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button onClick={handleBack} variant="outline" className="w-full sm:w-auto text-base py-3" disabled={isLoading}>
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        <Button 
          onClick={handleConfirmBooking} 
          disabled={isLoading}
          className="w-full sm:flex-1 text-base py-3 bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? 'Processing...' : (
            <>
              <CheckCircle className="mr-2 h-5 w-5" /> Confirm Booking & Pay
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading payment details...</div>}>
      <PaymentPageForm />
    </Suspense>
  );
}

