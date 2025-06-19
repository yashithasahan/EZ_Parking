import type { ParkingSlot, Booking, ParkingSlotStatus } from '@/types';

// export const mockParkingSlots: ParkingSlot[] = Array.from({ length: 20 }, (_, i) => {
//   const statuses: ParkingSlotStatus[] = ['available', 'occupied', 'reserved', 'maintenance'];
//   const status = statuses[Math.floor(Math.random() * statuses.length)];
//   const section = String.fromCharCode(65 + Math.floor(i / 5)); // A, B, C, D
//   const number = (i % 5) + 1;
//   return {
//     id: `slot-${section}${number}`,
//     location: `${section}${number}`,
//     status: status,
//     vehicleId: status === 'occupied' || status === 'reserved' ? `VEH-${Math.floor(Math.random() * 1000)}` : undefined,
//   };
// });

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    slotId: 'slot-A3',
    userId: 'user-123',
    vehiclePlate: 'XYZ 123',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    endTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    status: 'active',
  },
  {
    id: 'booking-2',
    slotId: 'slot-B1',
    userId: 'user-456',
    vehiclePlate: 'ABC 789',
    startTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    status: 'active',
  },
  {
    id: 'booking-3',
    slotId: 'slot-C5',
    userId: 'user-789',
    vehiclePlate: 'DEF 456',
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
    endTime: new Date(Date.now() - 22 * 60 * 60 * 1000), // yesterday
    status: 'completed',
  },
];
