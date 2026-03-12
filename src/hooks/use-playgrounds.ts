import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Playground {
  id: string;
  owner_id: string | null;
  name: string;
  description: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  sport_types: string[];
  price_per_hour: number;
  facilities: string[];
  images: string[];
  opening_time: string;
  closing_time: string;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface PlaygroundBooking {
  id: string;
  playground_id: string;
  user_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  total_hours: number;
  total_price: number;
  status: string;
  payment_method: string;
  created_at: string;
  playground?: Playground;
}

export interface PlaygroundReview {
  id: string;
  playground_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export function usePlaygrounds() {
  return useQuery({
    queryKey: ["playgrounds"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("playgrounds")
        .select("*")
        .order("rating", { ascending: false });
      if (error) throw error;
      return data as unknown as Playground[];
    },
  });
}

export function usePlayground(id: string) {
  return useQuery({
    queryKey: ["playground", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("playgrounds")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as unknown as Playground;
    },
    enabled: !!id,
  });
}

export function usePlaygroundReviews(playgroundId: string) {
  return useQuery({
    queryKey: ["playground-reviews", playgroundId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("playground_reviews")
        .select("*")
        .eq("playground_id", playgroundId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as PlaygroundReview[];
    },
    enabled: !!playgroundId,
  });
}

export function usePlaygroundBookings(playgroundId: string, date: string) {
  return useQuery({
    queryKey: ["playground-bookings", playgroundId, date],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("playground_bookings")
        .select("*")
        .eq("playground_id", playgroundId)
        .eq("booking_date", date)
        .eq("status", "confirmed");
      if (error) throw error;
      return data as unknown as PlaygroundBooking[];
    },
    enabled: !!playgroundId && !!date,
  });
}

export function useUserBookings() {
  return useQuery({
    queryKey: ["user-bookings"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase
        .from("playground_bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("booking_date", { ascending: false });
      if (error) throw error;
      
      // Fetch playground details for each booking
      const playgroundIds = [...new Set((data || []).map((b: any) => b.playground_id))];
      const { data: playgrounds } = await supabase
        .from("playgrounds")
        .select("*")
        .in("id", playgroundIds);
      
      const pgMap = new Map((playgrounds || []).map((p: any) => [p.id, p]));
      return (data || []).map((b: any) => ({
        ...b,
        playground: pgMap.get(b.playground_id),
      })) as PlaygroundBooking[];
    },
  });
}
