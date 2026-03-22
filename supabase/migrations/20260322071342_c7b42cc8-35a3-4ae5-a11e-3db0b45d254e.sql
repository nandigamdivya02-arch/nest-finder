
-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. RLS policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 5. Create properties table with status column
CREATE TYPE public.property_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'boys',
  address TEXT NOT NULL DEFAULT '',
  area TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT 'Hyderabad',
  pincode TEXT NOT NULL DEFAULT '',
  lat DOUBLE PRECISION DEFAULT 17.385,
  lng DOUBLE PRECISION DEFAULT 78.4867,
  price_min INTEGER NOT NULL DEFAULT 0,
  price_max INTEGER NOT NULL DEFAULT 0,
  room_types TEXT[] NOT NULL DEFAULT '{}',
  amenities TEXT[] NOT NULL DEFAULT '{}',
  rating NUMERIC NOT NULL DEFAULT 0,
  reviews INTEGER NOT NULL DEFAULT 0,
  images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  owner_name TEXT NOT NULL DEFAULT '',
  owner_phone TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false,
  furnished TEXT NOT NULL DEFAULT 'furnished',
  ac BOOLEAN NOT NULL DEFAULT false,
  food_included BOOLEAN NOT NULL DEFAULT false,
  availability TEXT NOT NULL DEFAULT 'available',
  status property_status NOT NULL DEFAULT 'pending',
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- 6. RLS: Public can only see approved properties
CREATE POLICY "Anyone can view approved properties"
  ON public.properties FOR SELECT
  USING (status = 'approved' OR submitted_by = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- 7. Authenticated users can submit properties
CREATE POLICY "Users can submit properties"
  ON public.properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = submitted_by);

-- 8. Admins can update any property (approve/reject)
CREATE POLICY "Admins can update properties"
  ON public.properties FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 9. Users can update own pending properties
CREATE POLICY "Users can update own pending properties"
  ON public.properties FOR UPDATE
  TO authenticated
  USING (submitted_by = auth.uid() AND status = 'pending');
