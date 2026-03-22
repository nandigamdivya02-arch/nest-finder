import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Property {
  id: string;
  name: string;
  type: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  lat: number | null;
  lng: number | null;
  price_min: number;
  price_max: number;
  room_types: string[];
  amenities: string[];
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  owner_name: string;
  owner_phone: string;
  featured: boolean;
  furnished: string;
  ac: boolean;
  food_included: boolean;
  availability: string;
  status: string;
  submitted_by: string | null;
  created_at: string;
  updated_at: string;
}

export const useApprovedProperties = () =>
  useQuery({
    queryKey: ["properties", "approved"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("status", "approved")
        .order("rating", { ascending: false });
      if (error) throw error;
      return data as Property[];
    },
  });

export const useAllProperties = () =>
  useQuery({
    queryKey: ["properties", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Property[];
    },
  });

export const useUpdatePropertyStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "pending" | "approved" | "rejected" }) => {
      const { error } = await supabase
        .from("properties")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

export const useSubmitProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (property: Omit<Property, "id" | "created_at" | "updated_at" | "rating" | "reviews" | "status" | "featured">) => {
      const { error } = await supabase
        .from("properties")
        .insert(property);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};
