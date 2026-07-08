create table if not exists public.cart (
    id bigint generated always as identity primary key,

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    product_id bigint not null
        references public.products(id)
        on delete cascade,

    quantity integer not null default 1,

    created_at timestamptz default now(),

    unique(user_id, product_id)
);

alter table public.cart enable row level security;

create policy "Users can view own cart"
on public.cart
for select
using (auth.uid() = user_id);

create policy "Users can add cart"
on public.cart
for insert
with check (auth.uid() = user_id);

create policy "Users can update cart"
on public.cart
for update
using (auth.uid() = user_id);

create policy "Users can delete cart"
on public.cart
for delete
using (auth.uid() = user_id);