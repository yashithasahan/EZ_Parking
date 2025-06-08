import type { Booking } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Car, Clock, Hash, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface BookingItemProps {
  booking: Booking;
}

const statusColors: Record<Booking['status'], string> = {
  active: 'bg-green-500',
  completed: 'bg-blue-500',
  cancelled: 'bg-red-500',
};

export function BookingItem({ booking }: BookingItemProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-lg">Booking ID: {booking.id.substring(0,12)}...</CardTitle>
          <Badge className={cn("text-primary-foreground", statusColors[booking.status])}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
        <CardDescription>Details for your parking reservation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm">
          <Hash className="mr-2 h-4 w-4 text-primary" />
          <span>Slot ID: <span className="font-semibold">{booking.slotId}</span></span>
        </div>
        <div className="flex items-center text-sm">
          <Car className="mr-2 h-4 w-4 text-primary" />
          <span>Vehicle Plate: <span className="font-semibold">{booking.vehiclePlate}</span></span>
        </div>
        <div className="flex items-center text-sm">
          <CalendarDays className="mr-2 h-4 w-4 text-primary" />
          <span>Date: <span className="font-semibold">{format(new Date(booking.startTime), 'MMM dd, yyyy')}</span></span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="mr-2 h-4 w-4 text-primary" />
          <span>Time: <span className="font-semibold">
            {format(new Date(booking.startTime), 'p')} - {format(new Date(booking.endTime), 'p')}
          </span></span>
        </div>
      </CardContent>
      {booking.status === 'active' && (
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full text-destructive border-destructive hover:bg-destructive/10">
            <Trash2 className="mr-2 h-4 w-4" /> Cancel Booking
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
