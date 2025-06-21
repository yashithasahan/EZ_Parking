
// 'use client';

// import { useState, useEffect, Suspense, useMemo } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { useToast } from '@/hooks/use-toast';
// import { ArrowLeft, CheckCircle, ParkingSquare, CalendarDays, Clock, Car as CarIcon, Tag } from 'lucide-react'; // Renamed Car to CarIcon to avoid conflict
// import { format, parse, differenceInMinutes, setHours, setMinutes } from 'date-fns';
// import { useBookingContext } from '@/context/BookingContext';
// import type { Booking } from '@/types';


// function PaymentPageForm() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { toast } = useToast();
//   const { addBooking } = useBookingContext();

//   const [isLoading, setIsLoading] = useState(false);

//   const slotId = searchParams.get('slotId');
//   const dateStr = searchParams.get('date');
//   const startTimeStr = searchParams.get('startTime');
//   const endTimeStr = searchParams.get('endTime');
//   const plate = searchParams.get('plate');
//   const type = searchParams.get('type');

//   useEffect(() => {
//     if (!slotId || !dateStr || !startTimeStr || !endTimeStr || !plate || !type) {
//       toast({
//         title: 'Missing Booking Information',
//         description: 'Some details are missing. Please start over.',
//         variant: 'destructive',
//       });
//       router.replace('/dashboard/book');
//     }
//   }, [slotId, dateStr, startTimeStr, endTimeStr, plate, type, router, toast]);

//   const bookingDetails = useMemo(() => {
//     if (!dateStr || !startTimeStr || !endTimeStr) return null;
//     const dateObj = parse(dateStr, 'yyyy-MM-dd', new Date());
//     const [startH, startM] = startTimeStr.split(':').map(Number);
//     const [endH, endM] = endTimeStr.split(':').map(Number);
    
//     const startDateTime = setMinutes(setHours(dateObj, startH), startM);
//     const endDateTime = setMinutes(setHours(dateObj, endH), endM);
    
//     const durationMinutes = differenceInMinutes(endDateTime, startDateTime);
//     const durationHours = durationMinutes / 60;
    
//     // Mock price: $5 per hour
//     const price = Math.max(5, durationHours * 5); // Minimum $5

//     return {
//       formattedDate: format(dateObj, 'PPP'),
//       startTime: startTimeStr,
//       endTime: endTimeStr,
//       duration: `${durationHours.toFixed(1)} hours (${durationMinutes} mins)`,
//       price: price.toFixed(2),
//       startDateTime,
//       endDateTime
//     };
//   }, [dateStr, startTimeStr, endTimeStr]);


//   const handleConfirmBooking = async () => {
//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1500));

//     if (slotId && plate && bookingDetails) {
//       const newBooking: Booking = {
//         id: `booking-${Date.now()}`,
//         slotId: slotId,
//         userId: 'user-mock', // Mock user ID
//         vehiclePlate: plate,
//         startTime: bookingDetails.startDateTime,
//         endTime: bookingDetails.endDateTime,
//         status: 'active',
//       };
//       addBooking(newBooking);
//     }

//     setIsLoading(false);
//     toast({
//       title: 'Booking Confirmed!',
//       description: `Parking slot ${slotId?.split('-')[1]} for ${plate} is reserved.`,
//       variant: 'default',
//       duration: 5000,
//     });
//     router.replace('/dashboard');
//   };

//   const handleBack = () => {
//     router.push(`/dashboard/book/vehicle-info?${searchParams.toString()}`);
//   };

//   if (!slotId || !plate || !type || !bookingDetails) {
//      return <div className="flex justify-center items-center h-full"><p>Loading booking summary or redirecting...</p></div>;
//   }

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-xl">
//       <CardHeader>
//         <CardTitle className="text-2xl font-headline">Review and Confirm Booking</CardTitle>
//         <CardDescription>Please review your booking details before confirming.</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
//           <h3 className="font-semibold text-lg mb-2">Booking Summary</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
//             <p className="flex items-center"><ParkingSquare className="mr-2 h-4 w-4 text-primary" /> Slot: <span className="font-medium ml-1">{slotId.split('-')[1]}</span></p>
//             <p className="flex items-center"><CarIcon className="mr-2 h-4 w-4 text-primary" /> Vehicle: <span className="font-medium ml-1">{plate} ({type})</span></p>
//             <p className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-primary" /> Date: <span className="font-medium ml-1">{bookingDetails.formattedDate}</span></p>
//             <p className="flex items-center"><Clock className="mr-2 h-4 w-4 text-primary" /> Time: <span className="font-medium ml-1">{bookingDetails.startTime} - {bookingDetails.endTime}</span></p>
//           </div>
//            <p className="flex items-center mt-2 text-sm"><Clock className="mr-2 h-4 w-4 text-primary" /> Duration: <span className="font-medium ml-1">{bookingDetails.duration}</span></p>
//         </div>

//         <div className="p-4 border rounded-lg">
//           <h3 className="font-semibold text-lg mb-2">Payment Details</h3>
//           <p className="text-sm text-muted-foreground">Total Amount: <span className="text-xl font-bold text-primary">${bookingDetails.price}</span></p>
//           <p className="text-xs text-muted-foreground mt-2">Payment processing is mocked for this demonstration. No actual charges will be made.</p>
//         </div>
//       </CardContent>
//       <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4">
//         <Button onClick={handleBack} variant="outline" className="w-full sm:w-auto text-base py-3" disabled={isLoading}>
//           <ArrowLeft className="mr-2 h-5 w-5" /> Back
//         </Button>
//         <Button 
//           onClick={handleConfirmBooking} 
//           disabled={isLoading || !bookingDetails}
//           className="w-full sm:flex-1 text-base py-3 bg-green-600 hover:bg-green-700 text-white"
//         >
//           {isLoading ? 'Processing...' : (
//             <>
//               <CheckCircle className="mr-2 h-5 w-5" /> Confirm Booking & Pay
//             </>
//           )}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }


// export default function PaymentPage() {
//   return (
//     <Suspense fallback={<div className="text-center p-8">Loading payment details...</div>}>
//       <PaymentPageForm />
//     </Suspense>
//   );
// }
"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  CheckCircle,
  ParkingSquare,
  CalendarDays,
  Clock,
  Car as CarIcon,
} from "lucide-react";
import {
  format,
  parse,
  differenceInMinutes,
  setHours,
  setMinutes,
} from "date-fns";
// import { useBookingContext } from '@/context/BookingContext'; // Keep or remove based on your needs
import type { Booking, NewBookingPayload, VehicleType } from "@/types"; // Import your types
import {
  createBooking,
  
} from "@/service/dashboard_service"; // Import new service functions
import {supabase} from "@/lib/supabase"; // Assuming you have a client-side Supabase instance

function PaymentPageForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  // Extract all necessary data from searchParams
  const slotId = searchParams.get("slotId"); // This is already the string like "A1"
  const dateStr = searchParams.get("date");
  const startTimeStr = searchParams.get("startTime");
  const endTimeStr = searchParams.get("endTime");
  const plate = searchParams.get("plate");
  const type = searchParams.get("type"); // This is the VehicleType string

  useEffect(() => {
    // Check if all required parameters are present.
    if (
      !slotId ||
      !dateStr ||
      !startTimeStr ||
      !endTimeStr ||
      !plate ||
      !type
    ) {
      toast({
        title: "Missing Booking Information",
        description:
          "Some details are missing. Please start over from slot selection.",
        variant: "destructive",
      });
      router.replace("/dashboard/book");
    }
  }, [slotId, dateStr, startTimeStr, endTimeStr, plate, type, router, toast]);

  const bookingDetails = useMemo(() => {
    if (!dateStr || !startTimeStr || !endTimeStr || !slotId) return null; // slotId check added

    const dateObj = parse(dateStr, "yyyy-MM-dd", new Date());
    const [startH, startM] = startTimeStr.split(":").map(Number);
    const [endH, endM] = endTimeStr.split(":").map(Number);

    const startDateTime = setMinutes(setHours(dateObj, startH), startM);
    const endDateTime = setMinutes(setHours(dateObj, endH), endM);

    const durationMinutes = differenceInMinutes(endDateTime, startDateTime);

    // Ensure end time is strictly after start time
    if (durationMinutes <= 0) {
      toast({
        title: "Invalid Time Range",
        description: "End time must be after start time.",
        variant: "destructive",
      });
      return null;
    }

   
    const calculatedDurationHours = Math.max(
      0.5,
      Math.ceil(durationMinutes / 30) * 0.5
    );
    const price = calculatedDurationHours * 100; 

    return {
      formattedDate: format(dateObj, "PPP"),
      startTime: startTimeStr,
      endTime: endTimeStr,
      duration: `${durationMinutes} minutes (${(durationMinutes / 60).toFixed(
        1
      )} hours)`,
      price: price.toFixed(2),
      startDateTime,
      endDateTime,
    };
  }, [dateStr, startTimeStr, endTimeStr, slotId, toast]);

  const handleConfirmBooking = async () => {
    setIsLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast({
          title: "Authentication Error",
          description: "Please log in again to confirm your booking.",
          variant: "destructive",
        });
        router.push("/login");
        return;
      }

      if (!slotId || !plate || !type || !bookingDetails) {
        toast({
          title: "Error",
          description:
            "Booking details are incomplete. Please go back and re-enter.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const newBookingPayload: NewBookingPayload = {
        slotId: Number(slotId),
        userId: user.id,
        vehiclePlate: plate,
        vehicleType: type as VehicleType, // Ensure type is VehicleType
        startTime: bookingDetails.startDateTime,
        endTime: bookingDetails.endDateTime,
        isPaid: true,
      };

      // Call the service function
      const createdBooking = await createBooking(newBookingPayload);

      toast({
        title: "Booking Confirmed!",
        description: `Parking slot ${slotId} for ${plate} is reserved. Your booking ID: ${createdBooking.id}`,
        variant: "default",
        duration: 5000,
      });

      router.replace("/dashboard");
    } catch (error: any) {
      console.error("Booking confirmation failed:", error);
      toast({
        title: "Booking Failed",
        description:
          error.message ||
          "An unexpected error occurred during booking. Please try again.",
        variant: "destructive",
        duration: 7000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push(`/dashboard/book/vehicle-info?${searchParams.toString()}`);
  };

  if (!slotId || !plate || !type || !bookingDetails) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading booking summary or redirecting...</p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          Review and Confirm Booking
        </CardTitle>
        <CardDescription>
          Please review your booking details before confirming.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
          <h3 className="font-semibold text-lg mb-2">Booking Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <p className="flex items-center">
              <ParkingSquare className="mr-2 h-4 w-4 text-primary" /> Slot:{" "}
              <span className="font-medium ml-1">{slotId}</span>
            </p>
            <p className="flex items-center">
              <CarIcon className="mr-2 h-4 w-4 text-primary" /> Vehicle:{" "}
              <span className="font-medium ml-1">
                {plate} ({type})
              </span>
            </p>
            <p className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4 text-primary" /> Date:{" "}
              <span className="font-medium ml-1">
                {bookingDetails.formattedDate}
              </span>
            </p>
            <p className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-primary" /> Time:{" "}
              <span className="font-medium ml-1">
                {bookingDetails.startTime} - {bookingDetails.endTime}
              </span>
            </p>
          </div>
          <p className="flex items-center mt-2 text-sm">
            <Clock className="mr-2 h-4 w-4 text-primary" /> Duration:{" "}
            <span className="font-medium ml-1">{bookingDetails.duration}</span>
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Payment Details</h3>
          <p className="text-sm text-muted-foreground">
            Total Amount:{" "}
            <span className="text-xl font-bold text-primary">
              LKR {bookingDetails.price}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Payment processing is mocked for this demonstration. No actual
            charges will be made.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          onClick={handleBack}
          variant="outline"
          className="w-full sm:w-auto text-base py-3"
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        <Button
          onClick={handleConfirmBooking}
          disabled={isLoading || !bookingDetails}
          className="w-full sm:flex-1 text-base py-3 bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? (
            "Processing..."
          ) : (
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
    <Suspense
      fallback={
        <div className="text-center p-8">Loading payment details...</div>
      }
    >
      <PaymentPageForm />
    </Suspense>
  );
}