// // app/dashboard/components/BookingItem.tsx

// "use client";

// import { useState } from "react";
// import type { Booking } from "@/types";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import {
//   CalendarDays,
//   Car,
//   Clock,
//   Hash,
//   Trash2,
//   QrCode,
//   CreditCard,
//   Settings,
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { QRCodeSVG } from "qrcode.react"; // The new QR Code component
// import { useToast } from "@/hooks/use-toast";
// // TODO: Create this cancellation function in your dashboard_service.ts
// // import { requestBookingCancellation } from '@/service/dashboard_service';

// interface BookingItemProps {
//   booking: Booking;
// }

// const statusColors: Record<Booking["status"], string> = {
//   active: "bg-green-500",
//   completed: "bg-blue-500",
//   cancelled: "bg-red-500",
//   pending: "bg-yellow-500",
//   // You might add new statuses like 'pending_cancellation'
// };

// export function BookingItem({ booking }: BookingItemProps) {
//   const { toast } = useToast();
//   const [isManageOpen, setIsManageOpen] = useState(false);

//   const handleCancellationRequest = async () => {
//     toast({
//       title: "Processing...",
//       description: "Submitting cancellation request.",
//     });
//     try {
//       // TODO: Implement the actual API call in your service
//       // await requestBookingCancellation(booking.id);
//       console.log("Cancellation requested for booking:", booking.id);
//       toast({
//         title: "Success",
//         description: "Your cancellation request has been submitted.",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to submit cancellation request.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
//       <CardHeader>
//         <div className="flex justify-between items-start">
//           <CardTitle className="font-headline text-lg">
//             Booking ID: {booking.id.substring(0, 12)}...
//           </CardTitle>
//           <Badge
//             className={cn(
//               "text-primary-foreground",
//               statusColors[booking.status]
//             )}
//           >
//             {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//           </Badge>
//         </div>
//         <CardDescription>Details for your parking reservation.</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-3 flex-grow">
//         <div className="flex items-center text-sm">
//           <Hash className="mr-2 h-4 w-4 text-primary" />
//           <span>
//             Slot ID: <span className="font-semibold">{booking.slotId}</span>
//           </span>
//         </div>
//         <div className="flex items-center text-sm">
//           <Car className="mr-2 h-4 w-4 text-primary" />
//           <span>
//             Vehicle Plate:{" "}
//             <span className="font-semibold">{booking.vehiclePlate}</span>
//           </span>
//         </div>
//         <div className="flex items-center text-sm">
//           <CalendarDays className="mr-2 h-4 w-4 text-primary" />
//           <span>
//             Date:{" "}
//             <span className="font-semibold">
//               {format(new Date(booking.startTime), "MMM dd, yyyy")}
//             </span>
//           </span>
//         </div>
//         <div className="flex items-center text-sm">
//           <Clock className="mr-2 h-4 w-4 text-primary" />
//           <span>
//             Time:{" "}
//             <span className="font-semibold">
//               {format(new Date(booking.startTime), "p")} -{" "}
//               {format(new Date(booking.endTime), "p")}
//             </span>
//           </span>
//         </div>
//       </CardContent>
//       {booking.status === "active" && (
//         <CardFooter>
//           <Dialog open={isManageOpen} onOpenChange={setIsManageOpen}>
//             <DialogTrigger asChild>
//               <Button variant="outline" size="sm" className="w-full">
//                 <Settings className="mr-2 h-4 w-4" /> Manage Booking
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Manage Booking</DialogTitle>
//               </DialogHeader>
//               <div className="grid grid-cols-1 gap-4 py-4">
//                 {/* Pay Now Button with QR Code Dialog */}
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <Button variant="default">
//                       <CreditCard className="mr-2 h-4 w-4" /> Pay Now
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="sm:max-w-md">
//                     <DialogHeader>
//                       <DialogTitle>Pay for Booking</DialogTitle>
//                     </DialogHeader>
//                     <div className="flex flex-col items-center justify-center p-4 space-y-4">
//                       <QRCodeSVG value={booking.id} size={256} />
//                       <p className="text-sm text-muted-foreground">
//                         Scan this QR code to complete payment.
//                       </p>
//                       <p className="text-xs text-muted-foreground break-all">
//                         ID: {booking.id}
//                       </p>
//                     </div>
//                   </DialogContent>
//                 </Dialog>

//                 {/* Request Cancellation Button */}
//                 <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <Button variant="destructive">
//                       <Trash2 className="mr-2 h-4 w-4" /> Request Cancellation
//                     </Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This will send a request to cancel your booking. This
//                         action cannot be immediately undone.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Back</AlertDialogCancel>
//                       <AlertDialogAction onClick={handleCancellationRequest}>
//                         Yes, Request Cancellation
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               </div>
//             </DialogContent>
//           </Dialog>
//         </CardFooter>
//       )}
//     </Card>
//   );
// }
"use client";

import { useState, useRef } from "react";
import type { Booking } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  CalendarDays,
  Car,
  Clock,
  Hash,
  Trash2,
  QrCode,
  CreditCard,
  Settings,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { supabase } from "@/lib/supabase";

interface BookingItemProps {
  booking: Booking;
}

const statusColors: Record<Booking["status"], string> = {
  active: "bg-green-500",
  completed: "bg-blue-500",
  cancelled: "bg-red-500",
  pending: "bg-yellow-500",
};

export function BookingItem({ booking }: BookingItemProps) {
  const { toast } = useToast();
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  // const handleCancellationRequest = async () => {
  //   toast({
  //     title: "Processing...",
  //     description: "Submitting cancellation request.",
  //   });
  //   try {
  //     // TODO: Implement the actual API call
  //     console.log("Cancellation requested for booking:", booking.id);
  //     toast({
  //       title: "Success",
  //       description: "Your cancellation request has been submitted.",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to submit cancellation request.",
  //       variant: "destructive",
  //     });
  //   }
  // };
  const handleCancellationRequest = async (bookingId: string) => {
    toast({
      title: "Processing...",
      description: "Submitting cancellation request.",
    });

    try {
      const { error } = await supabase
        .from("booking")
        .update({ status: "cancelled" })
        .eq("id", bookingId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Your cancellation request has been submitted.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to cancel booking.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPaymentOpen(false);
    setIsManageOpen(false);
    toast({
      title: "Payment Successful! ✅",
      description: "Your payment has been processed.",
    });
  };

  const handleDownloadTicket = () => {
    const input = ticketRef.current;
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`EZPark-Ticket-${booking.id.substring(0, 8)}.pdf`);
      });
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-lg">
            Booking ID: {booking.id.substring(0, 12)}...
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                "text-primary-foreground",
                statusColors[booking.status]
              )}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
            {/* QR Code Ticket Dialog Trigger */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <QrCode className="h-5 w-5 text-primary" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Your Parking Ticket</DialogTitle>
                </DialogHeader>
                <div
                  ref={ticketRef}
                  className="flex flex-col items-center justify-center p-6 bg-card rounded-lg"
                >
                  <h3 className="text-lg font-bold font-headline mb-2">
                    EZPark
                  </h3>
                  <QRCodeSVG value={booking.id} size={200} />
                  <p className="text-sm text-muted-foreground mt-4">
                    Scan upon entry and exit.
                  </p>
                  <p className="text-xs text-muted-foreground break-all mt-2">
                    ID: {booking.id}
                  </p>
                  <p className="text-sm font-semibold mt-2">
                    Slot: {booking.slotId} | Plate: {booking.vehiclePlate}
                  </p>
                </div>
                <DialogFooter className="mt-4">
                  <Button onClick={handleDownloadTicket} className="w-full">
                    <Download className="mr-2 h-4 w-4" /> Download Ticket
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <CardDescription>Details for your parking reservation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <div className="flex items-center text-sm">
          <Hash className="mr-2 h-4 w-4 text-primary" />
          <span>
            Slot ID: <span className="font-semibold">{booking.slotId}</span>
          </span>
        </div>
        <div className="flex items-center text-sm">
          <Car className="mr-2 h-4 w-4 text-primary" />
          <span>
            Vehicle Plate:{" "}
            <span className="font-semibold">{booking.vehiclePlate}</span>
          </span>
        </div>
        <div className="flex items-center text-sm">
          <CalendarDays className="mr-2 h-4 w-4 text-primary" />
          <span>
            Date:{" "}
            <span className="font-semibold">
              {format(new Date(booking.startTime), "MMM dd, yyyy")}
            </span>
          </span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="mr-2 h-4 w-4 text-primary" />
          <span>
            Time:{" "}
            <span className="font-semibold">
              {format(new Date(booking.startTime), "p")} -{" "}
              {format(new Date(booking.endTime), "p")}
            </span>
          </span>
        </div>
      </CardContent>
      {booking.status === "active" && (
        <CardFooter>
          <Dialog open={isManageOpen} onOpenChange={setIsManageOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="mr-2 h-4 w-4" /> Manage Booking
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Booking</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-4 py-4">
                {/* Pay Now Button */}
                <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default">
                      <CreditCard className="mr-2 h-4 w-4" /> Pay Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Complete Payment</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handlePaymentSubmit}
                      className="space-y-4 py-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="•••• •••• •••• ••••"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="expiry-date">Expiry Date</Label>
                          <Input
                            id="expiry-date"
                            placeholder="MM / YY"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="w-full">
                          Submit Payment
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Request Cancellation Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Request Cancellation
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will send a request to cancel your booking. This
                        action cannot be immediately undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Back</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleCancellationRequest(booking.id)}
                      >
                        Yes, Request Cancellation
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
}
