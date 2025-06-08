'use client';
import type { ParkingSlot, ParkingSlotStatus } from '@/types';
import { cn } from '@/lib/utils';
import { Car, Check, CircleSlash, Wrench } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ParkingLotProps {
  slots: ParkingSlot[];
}

const slotStatusStyles: Record<ParkingSlotStatus, string> = {
  available: 'bg-green-100 border-green-400 text-green-700 hover:bg-green-200',
  occupied: 'bg-red-100 border-red-400 text-red-700 cursor-not-allowed',
  reserved: 'bg-yellow-100 border-yellow-400 text-yellow-700 cursor-not-allowed',
  maintenance: 'bg-gray-200 border-gray-400 text-gray-600 cursor-not-allowed',
};

const slotStatusIcons: Record<ParkingSlotStatus, React.ReactNode> = {
  available: <Check className="h-5 w-5" />,
  occupied: <Car className="h-5 w-5" />,
  reserved: <CircleSlash className="h-5 w-5" />,
  maintenance: <Wrench className="h-5 w-5" />,
};

export function ParkingLot({ slots }: ParkingLotProps) {
  if (!slots || slots.length === 0) {
    return <p className="text-muted-foreground">No parking slot data available.</p>;
  }

  return (
    <TooltipProvider>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 p-4 bg-card rounded-lg shadow-md">
        {slots.map((slot) => (
          <Tooltip key={slot.id}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  'aspect-square rounded-md border flex flex-col items-center justify-center text-xs font-medium transition-all duration-150 ease-in-out',
                  slotStatusStyles[slot.status]
                )}
                role="button"
                tabIndex={slot.status === 'available' ? 0 : -1}
                aria-label={`Slot ${slot.location} - ${slot.status}`}
              >
                {slotStatusIcons[slot.status]}
                <span className="mt-1">{slot.location}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Slot: {slot.location}</p>
              <p>Status: <span className="capitalize">{slot.status}</span></p>
              {slot.vehicleId && <p>Vehicle: {slot.vehicleId}</p>}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
