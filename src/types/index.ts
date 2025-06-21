// src/types/index.ts

export type ParkingSlotStatus =
  | "available"
  | "occupied"
  | "reserved"
  | "maintenance";

export interface ParkingSlot {
  id: number; // CHANGED: Now a number (e.g., 1, 2, 3)
  is_occupied: boolean;
  is_reserved: boolean;
}

export type BookingStatus = "active" | "completed" | "cancelled" | "pending";

export interface Booking {
  id: string; // UUID from DB
  slotId: number; // CHANGED: Now a number
  userId: string;
  vehiclePlate: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
}

// New payload type for creating a booking, aligning with your current needs
export type NewBookingPayload = {
  slotId: number; // CHANGED: Now a number
  userId: string;
  vehiclePlate: string;
  vehicleType: VehicleType;
  startTime: Date;
  endTime: Date;
  isPaid: boolean;
};

export type VehicleType = "Car" | "Motorcycle" | "Van" | "SUV" | "Truck";

export const vehicleTypes: VehicleType[] = [
  "Car",
  "Motorcycle",
  "Van",
  "SUV",
  "Truck",
];
