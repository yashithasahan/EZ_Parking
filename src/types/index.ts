export type ParkingSlotStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';

export interface ParkingSlot {
  id: string;
  status: ParkingSlotStatus;
  location: string; // e.g., "A1", "B5"
  vehicleId?: string; // If occupied or reserved
}

export interface Booking {
  id: string;
  slotId: string;
  userId: string;
  vehiclePlate: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'completed' | 'cancelled';
}
