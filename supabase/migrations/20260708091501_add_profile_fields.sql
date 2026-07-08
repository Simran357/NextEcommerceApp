alter table profiles
add column full_name text,
add column phone text,
add column address text,
add column city text,
add column pincode text,
add column avatar_url text,
add column updated_at timestamptz default now();