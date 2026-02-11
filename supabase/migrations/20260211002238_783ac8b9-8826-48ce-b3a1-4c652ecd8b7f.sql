
-- Create quote_requests table for detailed quote submissions
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  project_type TEXT NOT NULL,
  roof_material TEXT,
  roof_stories TEXT,
  approximate_sqft TEXT,
  timeline TEXT,
  additional_details TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a quote request
CREATE POLICY "Anyone can submit quote requests"
ON public.quote_requests
FOR INSERT
WITH CHECK (true);

-- Admins can view quote requests
CREATE POLICY "Admins can view quote requests"
ON public.quote_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update quote requests
CREATE POLICY "Admins can update quote requests"
ON public.quote_requests
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete quote requests
CREATE POLICY "Admins can delete quote requests"
ON public.quote_requests
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.quote_requests;
