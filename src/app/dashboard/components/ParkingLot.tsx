"use client";

import type { ParkingSlot } from "@/types";
import { cn } from "@/lib/utils";
import { Car, Check, CircleSlash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DerivedParkingSlotStatus = "available" | "occupied" | "reserved";

interface ParkingLotProps {
  slots: ParkingSlot[];
  selectedSlotId?: number;
  onSlotClick?: (slotId: number, status: DerivedParkingSlotStatus) => void;
  isSelectable?: boolean; // << NEW, SIMPLIFIED PROP
}

const slotStatusStyles: Record<DerivedParkingSlotStatus, string> = {
  available: "bg-green-100 border-green-400 text-green-700",
  occupied: "bg-red-100 border-red-400 text-red-700",
  reserved: "bg-yellow-100 border-yellow-400 text-yellow-700",
};

const slotStatusIcons: Record<DerivedParkingSlotStatus, React.ReactNode> = {
  available: <Check className="h-5 w-5" />,
  occupied: <Car className="h-5 w-5" />,
  reserved: <CircleSlash className="h-5 w-5" />,
};

const getSlotStatus = (slot: ParkingSlot): DerivedParkingSlotStatus => {
  if (slot.is_occupied) return "occupied";
  if (slot.is_reserved) return "reserved";
  return "available";
};

export function ParkingLot({
  slots,
  selectedSlotId,
  onSlotClick,
  isSelectable = false, // << DEFAULTS TO FALSE (Dashboard Mode)
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
    if (isSelectable && onSlotClick) {
      onSlotClick(slot.id, status);
    }
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 p-4 bg-card rounded-lg shadow-md">
        {slots.map((slot) => {
          const status = getSlotStatus(slot);
          const isSelected = slot.id === selectedSlotId;

          // In selectable mode, we don't show status icons for a cleaner look
          const showStatusIcon = !isSelectable;

          return (
            <Tooltip key={slot.id}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "aspect-square rounded-md border flex flex-col items-center justify-center text-xs font-medium transition-all duration-150 ease-in-out relative",
                    // For booking screen, all slots are green. For dashboard, status color is dynamic.
                    isSelectable
                      ? slotStatusStyles["available"]
                      : slotStatusStyles[status],
                    // Add hover effect and cursor only when in selectable mode
                    isSelectable && "cursor-pointer hover:bg-green-200",
                    // The selection ring should only appear in selectable mode
                    isSelected &&
                      isSelectable &&
                      "ring-2 ring-primary ring-offset-2 shadow-lg"
                  )}
                  role={isSelectable ? "button" : "img"}
                  tabIndex={isSelectable ? 0 : -1}
                  aria-label={`Slot ${slot.id}${
                    isSelected && isSelectable ? " (Selected)" : ""
                  }`}
                  onClick={() => handleSlotInteraction(slot, status)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSlotInteraction(slot, status)
                  }
                >
                  {isSelected && isSelectable && (
                    <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                      <Check className="h-2.5 w-2.5" />
                    </div>
                  )}

                  {/* Show the status icon ONLY in dashboard mode */}
                  {showStatusIcon && slotStatusIcons[status]}

                  <span className="mt-1">{slot.id}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Slot: {slot.id}</p>

                {/* Show the status text ONLY in dashboard mode */}
                {showStatusIcon && (
                  <p>
                    Status: <span className="capitalize">{status}</span>
                  </p>
                )}
                {isSelectable && (
                  <p className="mt-1 text-xs text-primary">Click to select</p>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
