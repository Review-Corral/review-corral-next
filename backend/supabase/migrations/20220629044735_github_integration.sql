-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.github_integration
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone DEFAULT now(),
    team_id uuid NOT NULL REFERENCES public.team(id) ON DELETE CASCADE,
    access_token text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT github_integration_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.github_integration
    OWNER to postgres;

GRANT ALL ON TABLE public.github_integration TO anon;

GRANT ALL ON TABLE public.github_integration TO authenticated;

GRANT ALL ON TABLE public.github_integration TO postgres;

GRANT ALL ON TABLE public.github_integration TO service_role;
