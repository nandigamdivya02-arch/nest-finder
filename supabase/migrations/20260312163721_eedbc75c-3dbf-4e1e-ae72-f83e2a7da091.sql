
-- Playgrounds table
CREATE TABLE public.playgrounds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT 'Hyderabad',
  lat DOUBLE PRECISION DEFAULT 17.385,
  lng DOUBLE PRECISION DEFAULT 78.4867,
  sport_types TEXT[] NOT NULL DEFAULT '{}',
  price_per_hour INTEGER NOT NULL DEFAULT 500,
  facilities TEXT[] NOT NULL DEFAULT '{}',
  images TEXT[] NOT NULL DEFAULT '{}',
  opening_time TIME NOT NULL DEFAULT '06:00',
  closing_time TIME NOT NULL DEFAULT '22:00',
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Playground bookings table
CREATE TABLE public.playground_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  playground_id UUID REFERENCES public.playgrounds(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  total_hours INTEGER NOT NULL DEFAULT 1,
  total_price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  payment_method TEXT DEFAULT 'upi',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Playground reviews table
CREATE TABLE public.playground_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  playground_id UUID REFERENCES public.playgrounds(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.playgrounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playground_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playground_reviews ENABLE ROW LEVEL SECURITY;

-- Playgrounds: anyone can read active playgrounds
CREATE POLICY "Anyone can view active playgrounds" ON public.playgrounds
  FOR SELECT USING (is_active = true);

-- Playgrounds: owners can manage their own
CREATE POLICY "Owners can insert playgrounds" ON public.playgrounds
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own playgrounds" ON public.playgrounds
  FOR UPDATE TO authenticated USING (auth.uid() = owner_id);

-- Bookings: users can view own bookings
CREATE POLICY "Users can view own bookings" ON public.playground_bookings
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Bookings: users can create bookings
CREATE POLICY "Users can create bookings" ON public.playground_bookings
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Bookings: users can update own bookings (cancel/reschedule)
CREATE POLICY "Users can update own bookings" ON public.playground_bookings
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Bookings: playground owners can view bookings for their playgrounds
CREATE POLICY "Owners can view playground bookings" ON public.playground_bookings
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.playgrounds WHERE id = playground_id AND owner_id = auth.uid())
  );

-- Reviews: anyone can read reviews
CREATE POLICY "Anyone can view reviews" ON public.playground_reviews
  FOR SELECT USING (true);

-- Reviews: authenticated users can create reviews
CREATE POLICY "Users can create reviews" ON public.playground_reviews
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Enable realtime for bookings
ALTER PUBLICATION supabase_realtime ADD TABLE public.playground_bookings;
