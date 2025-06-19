import { supabase } from "@/lib/supabase";
import { User } from "lucide-react";

export const getAllSlots = async () => {
  const { data, error } = await supabase.from("slot").select("*");

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
};

export const getMyBookings = async (userId: string) => {
  const { data, error } = await supabase
    .from("booking")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
};
