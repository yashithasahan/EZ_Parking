// app/dashboard/components/BookingItem.tsx

"use client";

import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react"; // The new QR Code component
import { useToast } from "@/hooks/use-toast";
// TODO: Create this cancellation function in your dashboard_service.ts
// import { requestBookingCancellation } from '@/service/dashboard_service';

interface BookingItemProps {
  booking: Booking;
}

const statusColors: Record<Booking["status"], string> = {
  active: "bg-green-500",
  completed: "bg-blue-500",
  cancelled: "bg-red-500",
  pending: "bg-yellow-500",
  // You might add new statuses like 'pending_cancellation'
};

export function BookingItem({ booking }: BookingItemProps) {
  const { toast } = useToast();
  const [isManageOpen, setIsManageOpen] = useState(false);

  const handleCancellationRequest = async () => {
    toast({
      title: "Processing...",
      description: "Submitting cancellation request.",
    });
    try {
      // TODO: Implement the actual API call in your service
      // await requestBookingCancellation(booking.id);
      console.log("Cancellation requested for booking:", booking.id);
      toast({
        title: "Success",
        description: "Your cancellation request has been submitted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit cancellation request.",
        variant: "destructive",
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
          <Badge
            className={cn(
              "text-primary-foreground",
              statusColors[booking.status]
            )}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
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
                {/* Pay Now Button with QR Code Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">
                      <CreditCard className="mr-2 h-4 w-4" /> Pay Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Pay for Booking</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center p-4 space-y-4">
                      <QRCodeSVG value={booking.id} size={256} />
                      <p className="text-sm text-muted-foreground">
                        Scan this QR code to complete payment.
                      </p>
                      <p className="text-xs text-muted-foreground break-all">
                        ID: {booking.id}
                      </p>
                    </div>
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
                      <AlertDialogAction onClick={handleCancellationRequest}>
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
