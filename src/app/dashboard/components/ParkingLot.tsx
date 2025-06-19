
// 'use client';
// import type { ParkingSlot, ParkingSlotStatus } from '@/types';
// import { cn } from '@/lib/utils';
// import { Car, Check, CircleSlash, Wrench } from "lucide-react";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// interface ParkingLotProps {
//   slots: ParkingSlot[];
//   selectedSlotId?: string;
//   onSlotClick?: (slotId: string, status: ParkingSlotStatus) => void;
//   interactive?: boolean;
// }

// const slotStatusStyles: Record<ParkingSlotStatus, string> = {
//   available: 'bg-green-100 border-green-400 text-green-700 hover:bg-green-200',
//   occupied: 'bg-red-100 border-red-400 text-red-700 cursor-not-allowed',
//   reserved: 'bg-yellow-100 border-yellow-400 text-yellow-700 cursor-not-allowed',
//   maintenance: 'bg-gray-200 border-gray-400 text-gray-600 cursor-not-allowed',
// };

// const slotStatusIcons: Record<ParkingSlotStatus, React.ReactNode> = {
//   available: <Check className="h-5 w-5" />,
//   occupied: <Car className="h-5 w-5" />,
//   reserved: <CircleSlash className="h-5 w-5" />,
//   maintenance: <Wrench className="h-5 w-5" />,
// };

// export function ParkingLot({ slots, selectedSlotId, onSlotClick, interactive = false }: ParkingLotProps) {
//   if (!slots || slots.length === 0) {
//     return <p className="text-muted-foreground">No parking slot data available.</p>;
//   }

//   const handleSlotInteraction = (slot: ParkingSlot) => {
//     if (interactive && onSlotClick) {
//       onSlotClick(slot.id, slot.status);
//     }
//   };

//   return (
//     <TooltipProvider>
//       <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 p-4 bg-card rounded-lg shadow-md">
//         {slots.map((slot) => {
//           const isSelected = slot.id === selectedSlotId;
//           const isClickable = interactive && slot.status === 'available';
          
//           return (
//             <Tooltip key={slot.id}>
//               <TooltipTrigger asChild>
//                 <div
//                   className={cn(
//                     'aspect-square rounded-md border flex flex-col items-center justify-center text-xs font-medium transition-all duration-150 ease-in-out relative',
//                     slotStatusStyles[slot.status],
//                     isClickable && 'cursor-pointer',
//                     !isClickable && !interactive && 'cursor-default',
//                     isSelected && slot.status === 'available' && 'ring-2 ring-primary ring-offset-2 shadow-lg',
//                     isSelected && slot.status !== 'available' && 'ring-2 ring-destructive ring-offset-1'
//                   )}
//                   role={isClickable ? "button" : "img"}
//                   tabIndex={isClickable ? 0 : -1}
//                   aria-label={`Slot ${slot.location} - ${slot.status}${isSelected ? ' (Selected)' : ''}`}
//                   onClick={() => handleSlotInteraction(slot)}
//                   onKeyDown={(e) => e.key === 'Enter' && isClickable && handleSlotInteraction(slot)}
//                 >
//                   {interactive && slot.status === 'available' && isSelected && (
//                      <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
//                        <Check className="h-2.5 w-2.5" />
//                      </div>
//                   )}
//                   {slotStatusIcons[slot.status]}
//                   <span className="mt-1">{slot.location}</span>
//                 </div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Slot: {slot.location}</p>
//                 <p>Status: <span className="capitalize">{slot.status}</span></p>
//                 {slot.vehicleId && <p>Vehicle: {slot.vehicleId}</p>}
//                 {interactive && slot.status === 'available' && <p className="mt-1 text-xs text-primary">Click to select</p>}
//                 {interactive && slot.status !== 'available' && <p className="mt-1 text-xs text-destructive">Cannot select</p>}
//               </TooltipContent>
//             </Tooltip>
//           );
//         })}
//       </div>
//     </TooltipProvider>
//   );
// }
"use client";
import type { ParkingSlotStatus } from "@/types"; // You might need to adjust this type or keep it
import { cn } from "@/lib/utils";
import { Car, Check, CircleSlash, Wrench } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// The new ParkingSlot interface provided by you
export interface ParkingSlot {
  id: string;
  is_occupied: boolean;
  is_reserved: boolean;
}

// Keep the status type for internal component logic
type DerivedParkingSlotStatus = "available" | "occupied" | "reserved";

interface ParkingLotProps {
  slots: ParkingSlot[];
  selectedSlotId?: string;
  onSlotClick?: (slotId: string, status: DerivedParkingSlotStatus) => void;
  interactive?: boolean;
}

// Note: 'maintenance' status is removed as it cannot be derived from the new type.
const slotStatusStyles: Record<DerivedParkingSlotStatus, string> = {
  available: "bg-green-100 border-green-400 text-green-700 hover:bg-green-200",
  occupied: "bg-red-100 border-red-400 text-red-700 cursor-not-allowed",
  reserved:
    "bg-yellow-100 border-yellow-400 text-yellow-700 cursor-not-allowed",
};

// Note: 'maintenance' icon is removed.
const slotStatusIcons: Record<DerivedParkingSlotStatus, React.ReactNode> = {
  available: <Check className="h-5 w-5" />,
  occupied: <Car className="h-5 w-5" />,
  reserved: <CircleSlash className="h-5 w-5" />,
};

// Helper function to derive the status from the new slot properties
const getSlotStatus = (slot: ParkingSlot): DerivedParkingSlotStatus => {
  if (slot.is_occupied) {
    return "occupied";
  }
  if (slot.is_reserved) {
    return "reserved";
  }
  return "available";
};

export function ParkingLot({
  slots,
  selectedSlotId,
  onSlotClick,
  interactive = false,
}: ParkingLotProps) {
  if (!slots || slots.length === 0) {
    return (
      <p className="text-muted-foreground">No parking slot data available.</p>
    );
  }

  const handleSlotInteraction = (
    slot: ParkingSlot,
    status: DerivedParkingSlotStatus
  ) => {
    // Only allow interaction if the component is interactive
    if (interactive && onSlotClick) {
      onSlotClick(slot.id, status);
    }
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 p-4 bg-card rounded-lg shadow-md">
        {slots.map((slot) => {
          const status = getSlotStatus(slot);
          const isSelected = slot.id === selectedSlotId;
          const isClickable = interactive && status === "available";

          return (
            <Tooltip key={slot.id}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "aspect-square rounded-md border flex flex-col items-center justify-center text-xs font-medium transition-all duration-150 ease-in-out relative",
                    slotStatusStyles[status],
                    isClickable && "cursor-pointer",
                    !isClickable && !interactive && "cursor-default",
                    isSelected &&
                      status === "available" &&
                      "ring-2 ring-primary ring-offset-2 shadow-lg",
                    isSelected &&
                      status !== "available" &&
                      "ring-2 ring-destructive ring-offset-1"
                  )}
                  role={isClickable ? "button" : "img"}
                  tabIndex={isClickable ? 0 : -1}
                  aria-label={`Slot ${slot.id} - ${status}${
                    isSelected ? " (Selected)" : ""
                  }`}
                  onClick={() => handleSlotInteraction(slot, status)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    isClickable &&
                    handleSlotInteraction(slot, status)
                  }
                >
                  {interactive && status === "available" && isSelected && (
                    <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                      <Check className="h-2.5 w-2.5" />
                    </div>
                  )}
                  {slotStatusIcons[status]}
                  {/* Using slot.id as location is no longer available */}
                  <span className="mt-1">{slot.id}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {/* Using slot.id as location is no longer available */}
                <p>Slot: {slot.id}</p>
                <p>
                  Status: <span className="capitalize">{status}</span>
                </p>
                {/* vehicleId is no longer available in the new type */}
                {interactive && status === "available" && (
                  <p className="mt-1 text-xs text-primary">Click to select</p>
                )}
                {interactive && status !== "available" && (
                  <p className="mt-1 text-xs text-destructive">Cannot select</p>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}