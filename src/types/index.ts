
export type ParkingSlotStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';

export interface ParkingSlot {
  id: string;
  status: ParkingSlotStatus;
  location: string; // e.g., "A1", "B5"
  vehicleId?: string; // If occupied or reserved
}

export type BookingStatus = 'active' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  slotId: string;
  userId: string;
  vehiclePlate: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
}

export type VehicleType = 'Car' | 'Motorcycle' | 'Van' | 'SUV' | 'Truck';

export const vehicleTypes: VehicleType[] = ['Car', 'Motorcycle', 'Van', 'SUV', 'Truck'];
