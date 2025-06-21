// src/service/dashboard_service.ts
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import type {
  ParkingSlot,
  NewBookingPayload,
  Booking,
  ParkingSlotStatus,
  BookingStatus,
} from "@/types";
import { use } from "react";

export const getAllSlots = async (): Promise<ParkingSlot[]> => {
  const { data, error } = await supabase.from("slot").select("*");

  if (error) {
    console.error("Error fetching parking slots:", error);
    throw new Error(error.message);
  }

  const formattedData: ParkingSlot[] = data.map((slot: any) => ({
    id: slot.id, // This will already be a number from the DB
    is_occupied: slot.is_occupied,
    is_reserved: slot.is_reserved,
  }));

  return formattedData;
};

export const createBooking = async (
  payload: NewBookingPayload
): Promise<Booking> => {
  const {
    slotId,
    userId,
    vehiclePlate,
    vehicleType,
    startTime,
    endTime,
    isPaid,
  } = payload;

  // IMPORTANT: The root cause of your error is that the 'userId' variable here
  // is invalid and doesn't exist in your 'user' table.
  // You must fix this on your frontend before calling this function.

  try {
    // Redundant availability check removed as requested.
    // The main check now happens on the frontend with getAvailableSlots.

    const { data: vehicleData, error: vehicleError } = await supabase
      .from("vehicle")
      .upsert(
        { vehicle_number: vehiclePlate, type: vehicleType },
        { onConflict: "vehicle_number" }
      )
      .select("id")
      .single();

    if (vehicleError) throw vehicleError;
    const vehicleId = vehicleData.id;

    const { data: bookingData, error: bookingError } = await supabase
      .from("booking")
      .insert({
        slot_id: slotId,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        is_paid: isPaid,
        status: isPaid ? "active" : "pending",
        vehicle_id: vehicleId,
        user_id: userId,
      })
      .select("id, slot_id, start_time, end_time, status")
      .single();

    if (bookingError) {
      // This could happen if two users try to book the same slot at the same time.
      console.error("Error creating booking record:", bookingError);
      throw new Error(
        `Failed to create booking. The slot may have just been taken.`
      );
    }
    const bookingId = bookingData.id;

    return {
      id: bookingData.id,
      slotId: bookingData.slot_id,
      userId: userId,
      vehiclePlate: vehiclePlate,
      startTime: new Date(bookingData.start_time),
      endTime: new Date(bookingData.end_time),
      status: bookingData.status as BookingStatus,
    };
  } catch (error: any) {
    console.error("Failed to create full booking:", error.message);
    throw error;
  }
};
export const getMyBookings = async (userId: string): Promise<Booking[]> => {
  try {
    const { data, error } = await supabase
      .from("booking")
      .select(
        `
        *,
        vehicle (
          vehicle_number,
          type
        )
      `
      )

      .eq("user_id", userId)
      .order("start_time", { ascending: false }); // Order by start time, newest first

    if (error) {
      console.error("Error fetching my bookings:", error);
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }

    const userBookings: Booking[] = data.map((booking: any) => {
      // The vehicle information is now directly attached to the booking object
      const vehicleDetails = booking.vehicle;
      const vehicleNumber = vehicleDetails?.vehicle_number || "N/A";

      return {
        id: booking.id,
        slotId: booking.slot_id, // This will be a number
        userId: booking.user_id, // We get the userId from the booking record itself
        vehiclePlate: vehicleNumber,
        startTime: new Date(booking.start_time),
        endTime: new Date(booking.end_time),
        status: booking.status as BookingStatus,
      };
    });

    return userBookings;
  } catch (error: any) {
    console.error("Failed to retrieve user bookings:", error.message);
    throw error;
  }
};

export const getAvailableSlots = async (
  startTime: Date,
  endTime: Date
): Promise<ParkingSlot[]> => {
  // Step 1: Find the IDs of all slots that are already BOOKED during the selected time.
  // A booking overlaps if it starts before the new booking ends, AND it ends after the new booking starts.
  const { data: bookedSlots, error: bookingError } = await supabase
    .from("booking")
    .select("slot_id")
    .in("status", ["active", "pending"]) // Check against active and pending bookings
    .lt("start_time", endTime.toISOString()) // An existing booking starts before the new one ends...
    .gt("end_time", startTime.toISOString()); // ...and it ends after the new one starts.

  if (bookingError) {
    console.error("Error fetching booked slots:", bookingError);
    throw new Error(bookingError.message);
  }

  // Create a simple array of IDs that are not available.
  const unavailableSlotIds = bookedSlots.map((b) => b.slot_id);
  console.log("Unavailable Slot IDs:", unavailableSlotIds);

  // Step 2: Fetch all slots that are NOT in the list of booked IDs
  // and are not marked as permanently occupied or reserved (for maintenance, etc.).
  let query = supabase
    .from("slot")
    .select("*")

    .order("id", { ascending: true }); // It's good practice to order the results

  // If there are any slots booked for that time, add the 'not in' filter to the query.
  if (unavailableSlotIds.length > 0) {
    query = query.not("id", "in", `(${unavailableSlotIds.join(",")})`);
  }

  const { data: availableSlots, error: slotError } = await query;
  console.log("Availble slots", availableSlots);
  if (slotError) {
    console.error("Error fetching available slots:", slotError);
    throw new Error(slotError.message);
  }

  // Return the clean array of available slots.
  return availableSlots.map((slot: any) => ({
    id: slot.id,
    is_occupied: slot.is_occupied,
    is_reserved: slot.is_reserved,
  }));
};
