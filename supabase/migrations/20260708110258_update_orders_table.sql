alter table public.orders
add column title text not null default '',
add column thumbnail text;