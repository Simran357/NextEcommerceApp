create table if not exists public.products (
    id bigint primary key,
    title text not null,
    description text,
    category text not null,
    price numeric not null,
    discount_percentage numeric,
    rating numeric,
    stock integer,
    brand text,
    thumbnail text,
    created_at timestamptz default now()
);