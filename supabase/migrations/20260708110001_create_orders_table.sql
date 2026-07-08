create table public.orders (
  id bigint generated always as identity primary key,

  user_id uuid not null references profiles(id) on delete cascade,

  product_id bigint not null,

  quantity integer not null default 1,

  price numeric(10,2) not null,

  status text not null default 'Placed',

  created_at timestamptz default now()
);